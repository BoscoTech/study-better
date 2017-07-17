import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Fact, Column, FactSet } from './fact/fact-data';
import { FactSetService } from './fact/fact-set.service';
import { GapiService, Response } from './gwrap/gapi.service';
import { DriveService, FileR, FileListR, DriveUtil } from './gwrap/drive.service';
import { JaxComponent } from './jax/jax.component';
import { FormattedInputComponent } from './format/formatted-input.component';
import { Formats } from './format/formats';
import { EditorComponent } from './editors/editor.component';
import * as Realtime from './gwrap/realtime.service';
import { FactSetEditorComponent } from "app/editors/fact-set/fact-set-editor.component";

const TEST_ID = "0B2f-mdto55TRekhhaGhnV1E2WWs";

@Component
({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
	title = 'app works!';
	factSet: FactSet;
	loginButtonText = "Loading...";
	mathTest = "C2H3O2";
	formatter = Formats.reaction;
	@ViewChild(FactSetEditorComponent) editor: FactSetEditorComponent;
	
	setMathTest(newText: string): void {
		this.ngZone.run(() => this.mathTest = newText);
	}
	
	constructor(private factSetService: FactSetService, private gapiService: GapiService, private driveService: DriveService, private realtimeService: Realtime.RealtimeService, private ngZone: NgZone) {
		window["appComponent"] = this;
		window["Formats"] = Formats;
	}
	
	ngOnInit(): void {
		this.gapiService.loaded.listen((v: boolean) => this.ngZone.run(() => this.onAuthLoad()));
		this.factSetService.getFactSet().then(factSet => this.factSet = factSet); //Grab the data from the promise, once it's done.
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
	
	createFile(): void {
		this.driveService.files.createMetaOnly({}, {mimeType: "application/prs.study-better"}).then((r: Response<FileR>) => { });
	}
	
	openFile(): void {
		this.driveService.files.list({q: "mimeType='application/prs.study-better'"}).then(
				(r: Response<FileListR>) => this.editor.openFile(r.result.files[0].id));
	}
}



