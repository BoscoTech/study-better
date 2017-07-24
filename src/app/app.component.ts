import { Component, OnInit, NgZone, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { GapiService, Response } from './gwrap/gapi.service';
import { DriveService, FileR, FileListR, DriveUtil } from './gwrap/drive.service';
import { JaxComponent } from './jax/jax.component';
import { FormattedInputComponent } from './format/formatted-input.component';
import { Formats } from './format/formats';
import { EditorComponent } from './editors/editor.component';
import * as Realtime from './gwrap/realtime.service';
import { FactSetEditorComponent } from "app/editors/fact-set/fact-set-editor.component";
import { PickerService } from "app/gwrap/picker.service";
import * as picker from "app/gwrap/picker.service";

const TEST_ID = "0B2f-mdto55TRekhhaGhnV1E2WWs";

const ViewTypes = {
		NONE: 0,
		CHOOSE: 4,
		OPEN: 1,
		CREATE: 2,
		CREATING: 3
}

@Component
({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
	loginButtonText = "Loading...";
	@ViewChild(FactSetEditorComponent) editor: FactSetEditorComponent;
	show400Help = false;
	viewType = ViewTypes.CHOOSE;
	selectedFile: FileR;
	newFileName = "";
	
	get EditorComponent() {
		return EditorComponent; //For the template.
	}
	
	get ViewTypes() {
		return ViewTypes; //For the template.
	}
	
	constructor(private gapiService: GapiService, 
			private driveService: DriveService, 
			private realtimeService: Realtime.RealtimeService, 
			private ngZone: NgZone,
			private picker: PickerService) {
		window["appComponent"] = this;
		window["Formats"] = Formats;
	}
	
	ngOnInit(): void {
		this.gapiService.loaded.listen((v: boolean) => this.ngZone.run(() => this.onAuthLoad()));
	}
	
	onAuthLoad(): void {
		this.gapiService.signedIn.listen((v: boolean) => this.ngZone.run(() => this.updateLoginButtonText(v)));
		this.updateLoginButtonText(this.gapiService.signedIn.get()); //Update initial state, we might be logged in already.
	}
	
	updateLoginButtonText(userIsLoggedIn: boolean): void {
		if(userIsLoggedIn) {
			//this.realtimeService.load(TEST_ID, (r: Realtime.Document) => console.log(r));
			this.loginButtonText = "Sign Out";
		} else {
			this.loginButtonText = "Sign In";
		}
	}
	
	onAccountButtonPressed(): void {
		if(this.gapiService.loaded) {
			if(this.gapiService.signedIn.get()) {
				//this.gapiService.auth2.signOut();
				alert("Sorry, there was an error. It was completely Google's fault. Send them an angry email about how bad their programmers are.");
			} else {
				this.gapiService.signIn(true);
			}
		}
	}
	
	listFile(): void {
		this.driveService.files.list({q: "mimeType='application/prs.study-better'"}).then((r: Response<FileListR>) => console.log(r.result));
	}
	
	createFile(mimeType: string): void {
		this.viewType = ViewTypes.CREATING;
		let meta = {
				mimeType: mimeType,
				name: "Study Better File",
				parents: ["root"]
		}
		if(this.selectedFile && this.selectedFile.mimeType == "application/vnd.google-apps.folder") {
			meta.parents = [this.selectedFile.id];
		}
		if(this.newFileName != "") {
			meta.name = this.newFileName;
		}
		this.driveService.files.createMetaOnly({}, meta)
			.then((r: Response<FileR>) => {
			console.log(r);
			this.ngZone.run(() => {
				this.viewType = ViewTypes.NONE;
				this.openFile(r.result.id, r.result.mimeType);
			});
		});
	}
	
	openFile(id?: string, mimeType?: string): void {
		if(id && mimeType) {
			for(let editor of EditorComponent.editors) {
				editor.closeFile();
			}
			for(let editor of EditorComponent.editors) {
				if(editor.mimeType == mimeType) {
					editor.openFile(id);
					return;
				}
			}
		} else {
			let view = this.picker.createView(picker.ViewId.DOCS);
			let mimeTypes = "none";
			for(let editor of EditorComponent.editors) {
				mimeTypes += "," + editor.mimeType;
			}
			view.setMimeTypes(mimeTypes);
			this.picker.createBuilderWithBasics()
				.addView(view)
				.setTitle("Pick a File")
				.enableFeature(picker.Feature.NAV_HIDDEN)
				.setCallback((v: any) => {
					if(v[picker.Response.ACTION]==picker.Action.PICKED) {
						this.ngZone.run(() => {
							let doc = v[picker.Response.DOCUMENTS][0];
							this.openFile(doc.id, doc.mimeType);
						});
					}
				})
				.build().setVisible(true);
		}
	}
	
	setSelected(v: any): void {
		if(v[picker.Response.ACTION] == picker.Action.PICKED) {
			this.ngZone.run(() => {
				this.selectedFile = v[picker.Response.DOCUMENTS][0];
			});
		} else {
			this.ngZone.run(() => {
				this.selectedFile = undefined;
			});
		}
	}
	
	chooseFolder(): void {
		let view = this.picker.createView(picker.ViewId.FOLDERS);
		view.mc.selectFolder = true;
		this.picker.createBuilderWithBasics()
			.addView(view)
			.setTitle("Pick a Folder")
			.enableFeature(picker.Feature.NAV_HIDDEN)
			.setCallback((v: any) => this.setSelected(v))
			.build().setVisible(true);
	}
}



