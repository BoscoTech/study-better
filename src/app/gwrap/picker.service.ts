import { Injectable } from '@angular/core';
import { GapiService } from "app/gwrap/gapi.service";

export namespace ViewId {
	export let DOCS = "all";
	export let DOCS_IMAGES = "docs-images";
	export let DOCS_IMAGES_AND_VIDEOS = "docs-images-and-videos";
	export let DOCS_VIDEOS = "docs-videos";
	export let DOCUMENTS = "documents";
	export let DRAWINGS = "drawings";
	export let FOLDERS = "folders";
	export let FORMS = "forms";
	export let IMAGE_SEARCH = "image-search";
	export let MAPS = "maps";
	export let PDFS = "pdfs";
	export let PHOTOS = "photos";
	export let PHOTO_ALBUMS = "photo-albums";
	export let PHOTO_UPLOAD = "photo-upload";
	export let PRESENTATIONS = "presentations";
	export let RECENTLY_PICKED = "recently-picked";
	export let SPREADSHEETS = "spreadsheets";
	export let VIDEO_SEARCH = "video-search";
	export let WEBCAM = "webcam";
	export let YOUTUBE = "youtube";
}

export namespace DocsViewMode {
	export let GRID = "grid";
	export let LIST = "list";
}

export namespace Feature {
	export let MINE_ONLY = "mineOnly";
	export let MULTISELECT_ENABLED = "multiselectEnabled";
	export let NAV_HIDDEN = "navHidden";
	export let SIMPLE_UPLOAD_ENABLED = "simpleUploadEnabled";
}

export namespace Action {
	export let CANCEL = "cancel";
	export let PICKED = "picked";
}

export namespace Audience {
	export let ALL_PERSONAL_CIRCLES = "allPersonalCircles";
	export let DOMAIN_PUBLIC = "domainPublic";
	export let EXTENDED_CIRCLES = "extendedCircles";
	export let LIMITED = "limited";
	export let OWNER_ONLY = "ownerOnly";
	export let PUBLIC = "public";
}

export namespace Document {
	export let ADDRESS_LINES = "addressLines";
	export let AUDIENCE = "audience";
	export let DESCRIPTION = "description";
	export let DURATION = "duration";
	export let EMBEDDABLE_URL = "embedUrl";
	export let ICON_URL = "iconUrl";
	export let ID = "id";
	export let IS_NEW = "isNew";
	export let LAST_EDITED_UTC = "lastEditedUtc";
	export let LATITUDE = "latitude";
	export let LONGITUDE = "longitude";
	export let MIME_TYPE = "mimeType";
	export let NAME = "name";
	export let NUM_CHILDREN = "numChildren";
	export let PARENT_ID = "parentId";
	export let PHONE_NUMBERS = "phoneNumbers";
	export let SERVICE_ID = "serviceId";
	export let THUMBNAILS = "thumbnails";
	export let TYPE = "type";
	export let UR = "downloadUrl";
	export let URL = "url";
	export let VERSION = "version";
}

export namespace Response {
	export let ACTION = "action";
	export let DOCUMENTS = "docs";
	export let PARENTS = "parents";
	export let VIEW = "viewToken";
}

export interface View {
	getId(): string; //Returns one of the strings in ViewId.
	setMimeTypes(v: string): void; //Set a list of comma-seperated mime types to display.
	setQuery(v: string): void; //Set a query by which to filter files.
	mc: any;
}

export interface DocsUploadView {
	setIncludeFolders(v: boolean): void; //Allows uploading folders as well as files.
	setParent(v: string): void; //Set the destination for files to be uploaded to.
}

export interface DocsView extends View {
	setIncludeFolders(v: boolean): void; //Show folders as well as files?
	setSelectFoldersEnabled(v: boolean): void; //Can the user select a folder?
	setMode(v: string); //Set the view mode to a value in DocsViewMode
}

export interface ImageSearchView extends View {
	
}

export interface MapsView extends View {
	
}

export interface PhotoAlbumsView extends View {
	
}

export interface PhotosView extends View {
	
}

export interface Picker {
	isVisible(): boolean; //Returns true if the picker is currently visible.
	setCallback(c: (v: any) => any): void; //Called whenever the user picks an item or cancels.
	setRelayUrl(v: string): void; //???
	setVisible(b: boolean): void; //Sets if the picker is visible.
	dispose(): void; //Destroys it, I think?
}

export interface PickerBuilder {
	addView(v: View | string): PickerBuilder; //Adds a view to the picker, optionally via a ViewId.
	//addViewGroup(v: viewGroup);
	build(): Picker; //Returns the completed picker.
	disableFeature(v: string): PickerBuilder; //Disables one of the features in Feature
	enableFeature(v: string): PickerBuilder; //Enables one of the features in Feature
	getTitle(): string; //Returns the title of the picker.
	hideTitleBar(): PickerBuilder; //Erases the title bar.
	isFeatureEnabled(v: string): boolean; //Is a Feature enabled?
	setAppId(v: string): PickerBuilder; //Give it your gapi Appid
	setCallback(c: (v: any) => any): PickerBuilder; //Set the picker's callback.
	setDeveloperKey(k: string): PickerBuilder; //Give it a browser api key.
	setLocale(l: string): PickerBuilder; //Change language. l must be an ISO-639 language code.
	setMaxItems(m: number): PickerBuilder; //Max # of items the user can pick.
	setOAuthToken(t: string): PickerBuilder; //Requires token returned from user logging in.
	setOrigin(o: string): PickerBuilder; //Use this if the application is running in an iframe.
	setSelectableMimeTypes(t: string): PickerBuilder; //Comma-seperated list of mime types to be shown.
	setTitle(t: string): PickerBuilder; //Set the title of the dialog.
}

/*export interface PickerApi {
	DocsUploadView;
	DocsView(): DocsView;
	ImageSearchView(): ImageSearchView;
	MapsView(): MapsView;
	PhotoAlbumsView(): PhotoAlbumsView;
	PhotosView(): PhotosView;
	PickerBuilder(): PickerBuilder;
	View(id: string): View; //Create a view from a ViewID
}*/

@Injectable()
export class PickerService {
	private _pickerApi: any;
	
	constructor(private gapiService: GapiService) { 
		this.gapiService.loaded.listen((v: boolean) => this.loadApi(v));
		window['PickerService'] = this;
	}
	
	loadApi(loaded: boolean): void {
		this._pickerApi = window['google']['picker'];
	}
	
	createBuilder(): PickerBuilder {
		return new this._pickerApi.PickerBuilder()
	}
	
	createBuilderWithBasics(): PickerBuilder {
		let tr: PickerBuilder;
		tr = new this._pickerApi.PickerBuilder();
		if(this.gapiService.ngSignedIn)
			tr = tr.setOAuthToken(this.gapiService.oAuthToken);
		tr = tr.setAppId(window['client_id']);
		//tr = tr.setDeveloperKey(window['api_key']);
		return tr;
	}
	
	//Creates a view from an ID.
	createView(viewId: string): View {
		return new this._pickerApi.View(viewId);
	}
}





