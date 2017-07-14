import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Fact, Column, FactSet } from './fact/fact-data';
import { FactSetService } from './fact/fact-set.service';
import { GapiService, Response } from './gwrap/gapi.service';
import { DriveService, FileR, FileListR, DriveUtil } from './gwrap/drive.service';
import { JaxComponent } from './jax/jax.component';
import { FormattedInputComponent } from './format/formatted-input.component';
import { Formats } from './format/formats';
import * as Realtime from './gwrap/realtime.service';

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
				alert("Currently not working. I blame Google.");
			} else {
				this.gapiService.signIn(true);
			}
		}
	}
	
	listFile(): void {
		this.driveService.files.list({q: "mimeType='application/prs.study-better'"}).then((r: Response<FileListR>) => console.log(r.result));
	}
	
	createFile(): void {
		this.driveService.files.createMetaOnly({}, {mimeType: "application/prs.study-better"}).then((r: Response<FileR>) => console.log(r.result));
	}
	
	openFile(): void {
		var id = 0;
		this.driveService.files.list({q: "mimeType='application/prs.study-better'"}).then(
				(r: Response<FileListR>) => this.realtimeService.load(r.result.files[0].id, 
						(doc: any) => console.log(doc),
						(model: any) => {
							window['model'] = model
							this.realtimeService.initFileFromObject({
								obj1: "It's a string!",
								obj2: ["It's", "an", "array!"],
								map: {
									yay: "Yay",
									its: "it's",
									map: "MAP",
									time: "TIME"
								}
							})
						}));
	}
}



