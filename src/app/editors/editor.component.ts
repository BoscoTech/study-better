import { CollaborativeMap, Document, EventType, Model, RealtimeService } from "app/gwrap/realtime.service";
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
	private _editing: Document;
	private angularVars = {};
	private _loading: boolean;
	
	//Returns what the data structure should look like for a new document of this type.
	get defaultDataStructure(): any {
		return {};
	}
	
	//Returns a string of the mime type for this filetype.
	get mimeType(): string {
		return "application/prs.study-better.generic";
	}
	
	//Returns true if this filetype has a document loaded.
	get editing(): boolean {
		return this._editing && !this._editing.isClosed;
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
	
	constructor(private cdr: ChangeDetectorRef, private realtimeService: RealtimeService, private ngZone: NgZone) { }
	
	//Called whenever a change is made to the document
	onRootChange(event: any) {
		if(!event.isLocal) {
			this.cdr.detectChanges();
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
		this.realtimeService.load(id, (d: Document) => {
			this._editing = d;
			this._loading = false;
			console.log("Document loaded!");
			d.getModel().getRoot().addEventListener(EventType.OBJECT_CHANGED, (e: any) => this.onRootChange(e));
			this.cdr.detectChanges();
		}, (m: Model) => {
			console.log("Data structure initialized!");
			this.realtimeService.initFileFromObject(this.defaultDataStructure);
		});
	}
	
	//Returns a variable corresponding to a collaborative variable which triggers angular updates whenever the collaborative version changes.
	getAngularVarFor(path: Array<string>) {
		
	}
}
