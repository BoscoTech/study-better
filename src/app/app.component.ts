import { Component, OnInit, NgZone } from '@angular/core';
import { Fact, Column, FactSet } from './fact/fact-data';
import { FactSetService } from './fact/fact-set.service';
import { GapiService, Response } from './gwrap/gapi.service';
import { DriveService, FileR,  DriveUtil } from './gwrap/drive.service';

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
	
	constructor(private factSetService: FactSetService, private gapiService: GapiService, private driveService: DriveService, private ngZone: NgZone) { }
	
	ngOnInit(): void {
		this.gapiService.loaded.listen((v: boolean) => this.ngZone.run(() => this.onAuthLoad()));
		this.factSetService.getFactSet().then(factSet => this.factSet = factSet); //Grab the data from the promise, once it's done.
	}
	
	onAuthLoad(): void {
		this.gapiService.auth2.isSignedIn.listen((v: boolean) => this.ngZone.run(() => this.updateLoginButtonText(v)));
		this.updateLoginButtonText(this.gapiService.auth2.isSignedIn.get()); //Update initial state, we might be logged in already.
	}
	
	updateLoginButtonText(userIsLoggedIn: boolean): void {
		console.log(userIsLoggedIn);
		if(userIsLoggedIn) {
			this.loginButtonText = "Sign Out";
		} else {
			this.loginButtonText = "Sign In";
		}
	}
	
	onAccountButtonPressed(): void {
		if(this.gapiService.loaded) {
			if(this.gapiService.auth2.isSignedIn.get()) {
				this.gapiService.auth2.signOut();				
			} else {
				this.gapiService.auth2.signIn();				
			}
		}
	}
	
	testDrive(): void {
		this.driveService.files.updateMeta({fileId: TEST_ID}, DriveUtil.newFile("New Name")).then(console.log);
	}
}
