import { Injectable } from '@angular/core';
import { Client, Gapi, GapiService, Promise } from "./gapi.service";

export namespace EventType {
	export const ATTRIBUTE_CHANGED = "attribute_changed";
	export const COLLABORATION_STATUS_CHANGED = "collaboration_status_changed";
	export const COLLABORATOR_JOINED = "collaborator_joined";
	export const COLLABORATOR_LEFT = "collaborator_left";
	export const DOCUMENT_SAVE_STATE_CHANGED = "document_save_state_changed";
	export const OBJECT_CHANGED = "object_changed";
	export const REFERENCE_SHIFTED = "reference_shifted";
	export const TEXT_DELETED = "text_deleted";
	export const TEXT_INSERTED = "text_inserted";
	export const UNDO_REDO_STATE_CHANGED = "undo_redo_state_changed";
	export const VALUES_ADDED = "values_added";
	export const VALUES_REMOVED = "values_removed";
	export const VALUES_SET = "values_set";
	export const VALUE_CHANGED = "value_changed";
} 

export namespace CollaborativeType {
	export const COLLABORATIVE_MAP = "Map";
	export const COLLABORATIVE_LIST = "List";
	export const COLLABORATIVE_STRING = "EditableString";
	export const INDEX_REFERENCE = "IndexReference";
}

export interface EventDispatcher {
	addEventListener(eventType: string, listenerFunc: {(any): any}, capture?: boolean): void; //Add a listener for the event called eventType.
	removeAllEventListeners(): void; //Self-explanatory.
	removeEventListener(eventType: string, listenerFunc: {(any): any}, capture?: boolean): void; //Removes the specified listener from the specified event.	
}

export interface CollaborativeObject extends EventDispatcher {
	readonly id: string; //Id of this object.
	readonly type: string; //Type of data. For builtins, will be a CollaborativeType value.
	toString(): string; //Gives a string representation of the object.
}

export interface CollaborativeList extends CollaborativeObject {
	length: number; //Number of entries in the list. Write to this to reduce the size of the list.
	asArray(): Array<any>; //Returns the list's contents as an array. Changing the array will not change the CollaborativeList.
	clear(): void; //Removes all values.
	get(index: number): any; //Returns the object at that index.
	indexOf(value: any, compareFunc?: {(a: any, b: any): boolean}): number; //Returns index if found. Returns -1 if not. compareFunc can be used as custom equality determiner.
	insert(index: number, value: any): void; //Inserts an item into the list, giving it the specified index.
	insertAll(index: number, values: Array<any>): void; //Inserts all items into the list, starting at the specified index.
	lastIndexOf(value: any, compareFunc?: {(a: any, b: any): boolean}): number; //Looks for items starting from the end. Returns index if found. Returns -1 if not. compareFunc can be used as custom equality determiner.
	move(fromIndex: number, toIndex: number): void; //Moves the element at fromIndex to the slot before the item at toIndex.
	moveToList(fromIndex: number, toList: CollaborativeList, toIndex: number): void; //Moves the element at fromIndex to the slot before the item at toIndex in toList.
	push(value: any): void; //Pushes the value onto the end of the list.
	pushAll(values: Array<any>): void; //Pushes the values onto the end of the list.
	registerReference(a: any, b: any): any; //Not quite sure how this works, so I'm not going to make any assumptions.
	remove(index: number): void; //Removes an object from the list. (Does not delete it.)
	removeRange(start: number, end: number): void; //Removes between indexes. Indexes work like slicing in python.
	removeValue(value: any): boolean; //Removes the first instance of the value. Returns false if unsuccessful.
	replaceRange(startIndex: number, values: Array<any>): void; //Starting at startIndex, replaces elements in the list with elements from values.
	set(index: number, value: any): void; //Replaces the value at index with value
}

export interface CollaborativeMap extends CollaborativeObject {
	readonly size: number; //The number of keys in this map.
	clear(); //Remove all entries from the map. The entries will not be deleted.
	delete(key: string); //Removes the entry with the specified key from the map. The value itself will not be deleted.
	get(key: string): any; //Returns the value mapped to the key.
	has(key: string): boolean; //Returns true if this map contains the specified key.
	isEmpty(): boolean; //Returns true if size == 0.
	items(): Array<[string, any]>; //Returns all the key/value pairs in this map. Editing this will not change the map.
	keys(): Array<string>; //Returns all the keys in this map. Editing this will not change the map.
	set(key: string, value: any): void; //Adds a key/value pair to the map or, if the key already exists, updates the value.
}

export interface CollaborativeString extends CollaborativeObject {
	readonly length: number; //Length of string.
	text: string; //Content of string. Reading and writing will automatically call getText and setText.
	append(text: string): void; //Appends text to this string.
	getText() : string; //Gets string representation of this. Changing it will not change the collaborative string (I think...)
	insertString(index: number, text: string): void; //Insert text into this string at index.
	registerReference(a: any, b: any): any; //Not quite sure how this works, so I'm not going to make any assumptions.
	setText(text: string): void; //Set the content of this string. It does this via diff.
}

export interface Collaborator {
	color: string; //#RRGGBB hex formatted color for this user. Realtime tries to give everyone a unique color.
	displayName: string;
	isAnonymous: boolean; //True if the collaborator is an anonymous alligator or a shady seal or a...
	isMe: boolean; //True if this collaborator is the same as the user who logged in.
	permissionId: string; //Compatible with Drive permission data.
	photoUrl: string; //Url to the user's profile picture. It is a generic photo if the user is anonymous.
	sessionId: string; //A unique session ID for this instance. The same user might have multiple sessions.
	userId: string; //Compatible with most APIs except the permission api, use permissionId for that.
}

export interface Document extends EventDispatcher {
	readonly isClosed: boolean; //Has the document been closed?
	readonly isInGoogleDrive: boolean; //Was the file opened from drive, or created spontaneously?
	readonly saveDelay: number; //Number of milliseconds that changes have been waiting to be saved.
	close(): void; //Close the document and disconnect from the server. Any use of the document after this causes errors.
	getCollaborators(): Array<Collaborator>; //Gets the list of collaborators.
	getModel(): Model; //Returns the data model for this document.
	saveAs(fileId: string); //Copy to a new file. Any subsequent changes change that file.
}

export interface Model extends EventDispatcher {
	readonly bytesUsed: number; //Estimated number of bytes used to store the model data.
	readonly canRedo: boolean; //True if the model can currently redo.
	readonly canUndo: boolean; //True if the model can currently undo.
	createJsObject(typeName: string): any; //Creates the native JS object for a given collaborative object type.
	beginCompoundOperation(name?: string, isUndoable?: boolean): void; //Starts a compound operation. All subsequent operations will be bound together. Name is for user convenience. If it is undoable, all subsequent operations must be undoable.
	endCompoundOperation(): void; //Ends the current compound operation, and dispatches the result.
	createList(value?: Array<any>): CollaborativeList; //Creates a collaborative list, with an optional starting value.
	createMap(value?: Array<[string, any]>): CollaborativeMap; //Creates a collaborative map, with an optional starting value.
	createString(value?: string): CollaborativeString; //Creates a collaborative string, with an optional starting value.
	getRoot(): CollaborativeMap; //Gets the root element of the data structure.
	isReadOnly(): boolean; //Is the document in read-only mode?
	undo(): void; //Undo the last thing the current user did.
	redo(): void; //Redo the last thing the current user did.
	serverRevision(): number; //The current revision number, according to the server.
	toJson(appid?: string, revision?: number): string; //Returns a JSON-serialized version of the data. appid and revision are optionally added to the data.
}

export interface Error {
	isFatal: boolean; //Is this an unrecoverable error?
	message: string; //String describing the error.
	type: string; //Type of error that occurred.
	toString(): string; //Returns a string representation of the error.
}

@Injectable()
export class RealtimeService {
	private realtime: any;
	
	constructor(private gapiService: GapiService) { 
		gapiService.loaded.listen((loaded: boolean) => this.loadRealtimeFromGapi());
	}
	
	private loadRealtimeFromGapi(): void {
		this.realtime = this.gapiService.gapi.drive.realtime;
	}
	
	debug(): void {
		if(this.realtime) {
			this.realtime.debug();
		} else {
			throw "Realtime has not been loaded yet!";
		}
	}
	
	enableTestMode(): void {
		if(this.realtime) {
			this.realtime.enableTestMode();
		} else {
			throw "Realtime has not been loaded yet!";
		}
	}
	
	load(fileId: string, onLoaded: {(Document): any}, onInit?: {(Model): any}, onError?: {(Error): any}): void {
		if(this.realtime) {
			this.realtime.load(fileId, onLoaded, onInit, onError);
		} else {
			throw "Realtime has not been loaded yet!";
		}
	}
	
	loadAppDataDocument(onLoaded: {(Document): any}, onInit?: {(Model): any}, onError?: {(Error): any}): void {
		if(this.realtime) {
			this.realtime.loadAppDataDocument(onLoaded, onInit, onError);
		}
	}
	
	loadFromJson(json: string, onError?: {(Error): any}): Document {
		if(this.realtime) {
			return this.realtime.loadFromJson(json, onError);
		} else {
			throw "Realtime has not been loaded yet!";
		}
	}
	
	newInMemoryDocument(onLoaded: {(Document): any}, onInit?: {(Model): any}, onError?: {(Error): any}): Document {
		if(this.realtime) {
			return this.realtime.loadAppDataDocument(onLoaded, onInit, onError);
		} else {
			throw "Realtime has not been loaded yet!";
		}
	}
}




