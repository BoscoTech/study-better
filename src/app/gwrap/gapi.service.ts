import { Injectable, NgZone } from '@angular/core';

export interface AuthResponse {
	access_token: string;
	expires_at: number;
	expires_in: number;
	first_issued_at: number;
	id_token: string;
	idpId: string;
	login_hint: string;
	scope: string;
	session_state: any;
	token_type: string;
}

export interface BasicProfile {
	getEmail(): string;
	getFamilyName(): string;
	getGivenName(): string;
	getId(): string;
	getImageUrl(): string;
	getName(): string;
}

export interface User {
	disconnect(): any;
	getAuthResopnse(): AuthResponse;
	getBasicProfile(): BasicProfile;
	getGrantedScopes(): string;
	getHostedDomain(): any;
	getId(): string;
	isSignedIn(): boolean;
}

export interface RemoteResource<T> {
	get(): T;
	set(T): void;
	listen(listenFunc: {(val: T): any}): void;
}

class RemoteResourceClass<T> implements RemoteResource<T> {
	private _val: T;
	private listeners = new Array<{(val: T) : any}>();

	constructor(initVal: T) {
		this._val = initVal;
	}
	
	get(): T {
		return this._val;
	}
	
	set(val: T) {
		this._val = val;
		for(let i = 0; i < this.listeners.length; i++) {
			this.listeners[i](this._val);
		}
	}
	
	listen(listenFunc: {(val: T): any}): void {
		this.listeners.push(listenFunc);
	}
}

export interface Response<T> {
	result: T;
	body: string;
	headers?: any;
	status?: number;
	statusText?: string;
}

export interface Promise<T> {
	then(onFulfilled?: {(response: Response<T>): any}, onRejected?: {(response: Response<T>): any}, context?: any): void;
	execute(callback: {(jsonResp: any, rawResp: any)});
}

export interface Auth {
	authorize(args: {client_id: string, scope: string, immediate: boolean},
			callback: {(any): any});
}

export interface Client {
	request(any): Promise<any>;
	authorize(any): void;
}

export interface Gapi {
	auth2: any;
	client: Client;
	drive: {realtime: any};
}

@Injectable()
export class GapiService {
	private _loaded = new RemoteResourceClass<boolean>(false);
	private _isProblem = new RemoteResourceClass<boolean>(false);
	private _signedIn = new RemoteResourceClass<boolean>(false);
	private _ngLoaded = false;
	private _ngIsProblem = false;
	private _ngSignedIn = false;
	private _gapi: Gapi;
	private _auth: Auth;
	
	get loaded(): RemoteResource<boolean> {
		return this._loaded;
	}
	
	get isProblem(): RemoteResourceClass<boolean> {
		return this._isProblem;
	}
	
	get signedIn(): RemoteResource<boolean> {
		return this._signedIn;
	}
	
	get ngLoaded(): boolean {
		return this._ngLoaded;
	}
	
	get ngIsProblem(): boolean {
		return this._ngIsProblem;
	}
	
	get ngSignedIn(): boolean {
		return this._ngSignedIn;
	}
	
	get gapi(): any {
		return this._gapi;
	}
	
	get auth(): Auth {
		return this._auth;
	}
	
	get client(): Client {
		return this._gapi.client;
	}
	
	constructor(private ngZone: NgZone) { 
		window["gapiLoadedAngularCallback"] = (gapi: any, autoLoginSuccess: boolean) => this.gapiLoadedAngularCallback(gapi, autoLoginSuccess);
		//window["ngZone"] = this.ngZone
	}
	
	gapiLoadedAngularCallback(gapi: any, autoLoginSuccess: boolean): void {
		this.ngZone.run(() => {
			this._gapi = gapi;
			this._auth = gapi.auth;
			this._loaded.set(true);
			this._signedIn.set(autoLoginSuccess);
			this._ngLoaded = true;
			this._ngSignedIn = autoLoginSuccess
		});
	}
	
	//Handles a response from gapi.auth.
	handleAuthResponse(response: any) {
		if(response && response.status) {
			let signedIn = response.status.signed_in
			this._signedIn.set(signedIn);
			this.ngZone.run(() => this._ngSignedIn = signedIn);
		}
	}
	
	//Sets isProblem to false.
	clearProblem(): void {
		this._isProblem.set(false);
		this.ngZone.run(() => this._ngIsProblem = false);
	}
	
	//Try to log in with or without user intervention.
	signIn(prompt: boolean): void {
		if(prompt && !this._signedIn.get()) { //If the user is not yet signed in, they might eventually run in to the error.
			setTimeout(() => {
				if(this._signedIn.get()) return; //If the sign in was successful, don't ask if the user had a problem.				
				this._isProblem.set(true);
				this.ngZone.run(() => this._ngIsProblem = true);
			}, 7.5 * 1000);
		}
		this._auth.authorize({
			client_id: window['client_id'],
			scope: window['scope'],
			immediate: !prompt
		}, (r: any) => {
			this.handleAuthResponse(r);
		});
	}
}
