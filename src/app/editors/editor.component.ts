import { CollaborativeMap, Document, EventType, Model, RealtimeService, CollaborativeList, CollaborativeString } from "app/gwrap/realtime.service";
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { InjectorRef } from "app/injector-ref";

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
	private _editing: Document;
	private angularVars = {};
	private _loading: boolean;
	
	protected realtime: RealtimeService;
	protected ngZone: NgZone;
	
	private static _editors = new Array<EditorComponent>();
	private static _ngEditors = new Array<EditorComponent>();
	
	//Returns a list of all editors instantiated.
	static get editors(): Array<EditorComponent> {
		return EditorComponent._editors;
	}
	
	//Returns a list of all editors instantiated. The resulting array will trigger change detection when changed.
	static get ngEditors(): Array<EditorComponent> {
		return EditorComponent._ngEditors;
	}
	
	//Returns what the data structure should look like for a new document of this type.
	get defaultDataStructure(): any {
		return {};
	}
	
	//Returns a string of the mime type for this file type.
	get mimeType(): string {
		return "application/prs.study-better.generic";
	}
	
	//Returns a human-readable name for this file type.
	get hrName(): string {
		return "Generic";
	}
	
	//Returns true if this filetype has a document loaded.
	get editing(): boolean {
		return this._editing && !this._editing.isClosed;
	}
	
	//Returns the model that is being edited.
	get model(): Model {
		return (this.editing) ? this._editing.getModel() : null;
	}
	
	//Returns true if a document is currently being loaded.
	get loading(): boolean {
		return this._loading;
	}
	
	//Returns the root of the document currently being edited. (If nothing is being edited, returns null.)
	get editingRoot(): CollaborativeMap {
		if(this.editing) {
			return this._editing.getModel().getRoot();
		} else {
			return null;
		}
	}
	
	constructor(protected cdr: ChangeDetectorRef) { 
		this.realtime = InjectorRef.injector.get(RealtimeService);
		this.ngZone = InjectorRef.injector.get(NgZone);
		EditorComponent._editors.push(this);
		this.ngZone.run(() => EditorComponent._ngEditors.push(this));
	}
	
	//Called whenever a change is made to the document
	onRootChange(event: any) {
		if(!event.isLocal) {
			this.ngZone.run(() => this.cdr.detectChanges());
		}
	}
	
	//Sets loading to true, to show the user that progress is being made. Call this if it will take time before openFile will be called.
	load(): void {
		this._loading = true;
	}
	
	//Called to load from a google drive file id
	openFile(id: string): void {
		this._loading = true;
		this.cdr.detectChanges();
		this.realtime.load(id, (d: Document) => {
			this._editing = d;
			this._loading = false;
			d.getModel().getRoot().addEventListener(EventType.OBJECT_CHANGED, (e: any) => this.onRootChange(e));
			this.ngZone.run(() => this.cdr.detectChanges());
		}, (m: Model) => {
			this.realtime.initFileFromObject(this.defaultDataStructure);
		});
	}
	
	//Disconnects from the document
	closeFile(): void {
		if(this.editing) {
			this._editing.close();
			this.cdr.detectChanges();
		}
	}
	
	//E.G. getPath('key', 1) would be equivalent to editingRoot.get('key').get(1)
	getPath(...path: Array<string|number>): any {
		let next: any;
		next = this.editingRoot;
		for(let v of path) {
			next = next.get(v);
		}
		return next;
	}
	
	//Begins a compound operation
	beginCompoundOperation(name?: string, isUndoable?: boolean): void {
		this.model.beginCompoundOperation(name, isUndoable);
	}
	
	//Ends a compound operation
	endCompoundOperation(): void {
		this.model.endCompoundOperation();
	}
	
	//Creates a new collaborative string.
	createString(value?: string): CollaborativeString {
		return this.model.createString(value);
	}
	
	//Creates a new collaborative list.
	createList(value?: Array<any>): CollaborativeList {
		return this.model.createList(value);
	}
	
	//Creates a new collaborative map.
	createMap(value?: Array<[string, any]>): CollaborativeMap {
		return this.model.createMap(value);
	}
}
