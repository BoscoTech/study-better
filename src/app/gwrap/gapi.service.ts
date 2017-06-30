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

export interface Auth2 {
	currentUser: RemoteResource<User>
	isSignedIn: RemoteResource<boolean>
	signIn(): void;
	signOut(): void;
}

export interface Client {
	request(any): Promise<any>;
}

export interface Gapi {
	auth2: Auth2;
	client: Client;
}

@Injectable()
export class GapiService {
	private _loaded = new RemoteResourceClass<boolean>(true);
	private _ngLoaded = false;
	private _ngSignedIn = false;
	private _gapi: Gapi;
	private _auth2: Auth2;
	
	get loaded(): RemoteResource<boolean> {
		return this._loaded;
	}
	
	get ngLoaded(): boolean {
		return this._ngLoaded;
	}
	
	get ngSignedIn(): boolean {
		return this._ngSignedIn;
	}
	
	get gapi(): any {
		return this._gapi;
	}
	
	get auth2(): Auth2 {
		return this._auth2;
	}
	
	get client(): Client {
		return this._gapi.client;
	}
	
	constructor(private ngZone: NgZone) { 
		window["gapiLoadedAngularCallback"] = (gapi: any) => this.gapiLoadedAngularCallback(gapi);
		//window["ngZone"] = this.ngZone
	}
	
	gapiLoadedAngularCallback(gapi: any): void {
		this.ngZone.run(() => {
			this._gapi = gapi;
			this._auth2 = gapi.auth2.getAuthInstance();
			this._auth2.isSignedIn.listen((v: boolean) => this.ngZone.run(() => this._ngSignedIn = v));
			this._loaded.set(true);
			this._ngLoaded = true;
			this._ngSignedIn = this._auth2.isSignedIn.get();
		})
	}
}
