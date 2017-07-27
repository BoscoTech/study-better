import { Injectable, NgZone } from "@angular/core";
import { Client, Gapi, GapiService, Promise } from "./gapi.service";

export interface Empty { }
export interface EmptyP extends Empty { }
export interface EmptyR extends Empty { }

export interface SupportsTeamDrivesP {
	supportsTeamDrives?: boolean; //Whether or not this app supports team drives (default false).
}

export interface TeamDriveP extends SupportsTeamDrivesP {
	teamDriveId?: string; //The ID of the team drive for which the starting pageToken for listing future changes from that team drive will be returned.
}

export interface GetStartPageTokenP extends TeamDriveP { }

export interface ListChangesP extends TeamDriveP {
	pageToken: string; //Token for continuing a previous list or from getStartPageToken.
	includeCorpusRemovals?: boolean; //Include changes for files that will not change? (default: false)
	includeRemoved?: boolean; //Include changes for items that have been deleted / revoked? (default: true)
	includeTeamDriveItems?: boolean; //Include team drive items? (default: false)
	pageSize?: number; //Max # results to return. (default: 100, range: 1-1000)
	restrictToMyDrive?: boolean; //Omit appdata / files not somewhere in My Drive? (default: false)
	spaces?: string; //Comma-seperated list of spaces to include. (Valid values: drive, appDataFolder, photos)
}

export interface WatchChangesP extends TeamDriveP {
	pageToken: string; //Token for continuing a previous list or from getStartPageToken.
	includeCorpusRemovals?: boolean; //Include changes for files that will not change? (default: false)
	includeRemoved?: boolean; //Include changes for items that have been deleted / revoked? (default: true)
	includeTeamDriveItems?: boolean; //Include team drive items? (default: false)
	pageSize?: number; //Max # results to return. (default: 100, range: 1-1000)
	restrictToMyDrive?: boolean; //Omit appdata / files not somewhere in My Drive? (default: false)
	spaces?: string; //Comma-seperated list of spaces to include. (Valid values: drive, appDataFolder, photos)	
	//resource: ChannelR; //New channel resource to configure how data is sent to the client.
}

export interface StopChannelP {
	//resource: ChannelR; //Which channel should stop sending information.
}

export interface CreateCommentP {
	fileId: string; //FileId to put the new comment on.
	//resource: CommentR; //Comment to add. content is required. anchor and quotedFileContent.value are optional.
}

export interface DeleteCommentP {
	fileId: string; //FileId to delete the comment from.
	commentId: string; //Comment id to delete.
}

export interface GetCommentP {
	fileId: string; //FileId to get the comment from.
	commentId: string; //Comment id to delete.
	includeDeleted?: boolean; //Return the comment, even if it is deleted?
}

export interface ListCommentsP {
	fileId: string; //FileId to list the comments from.
	includeDeleted?: boolean; //List deleted comments, too? (default: false)
	pageSize?: number; //Max results to return. (default: 20) (range: 1-100)
	pageToken?: string; //Token to continue from a previous page.
	startModifiedTime?: string; //Oldest allowed modifiedTime. (RFC 3339)
}

export interface UpdateCommentP {
	fileId: string; //FileId to delete the comment from.
	commentId: string; //Comment id to delete.
	//resource: CommentR; //content is required. Nothing else is allowed.
}

export interface CopyFileP {
	fileId: string; //File id to copy from.
	ignoreDefaultVisibility?: boolean; //Ignore default visibility settings from the folder? (default: false)
	keepRevisionForever?: boolean; //Keep this version of the file forever? (default: false)
	ocrLanguage?: string; //Language hint for OCR processing (ISO 639.1)
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)
}

export interface CreateFileAndUploadP {
	uploadType: string; //Values are: media (simple upload), multipart, resumable.
	ignoreDefaultVisibility?: boolean; //Ignore default visibility settings from the folder? (default: false)
	keepRevisionForever?: boolean; //Keep this version of the file forever? (default: false)
	ocrLanguage?: string; //Language hint for OCR processing (ISO 639.1)
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)
	useContentAsIndexableText?: boolean; //Marks the content as searchable. (default: false)
}

export interface CreateFileMetaOnlyP {
	ignoreDefaultVisibility?: boolean; //Ignore default visibility settings from the folder? (default: false)
	keepRevisionForever?: boolean; //Keep this version of the file forever? (default: false)
	ocrLanguage?: string; //Language hint for OCR processing (ISO 639.1)
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)
	useContentAsIndexableText?: boolean; //Marks the content as searchable. (default: false)
}

export interface DeleteFileP {
	fileId: string; //File id to delete.
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)	
}

export interface EmptyTrashP { }

export interface ExportFileP {
	fileId: string; //File id to export.
	mimeType: string; //Mime type to export to.
}

export interface GenerateIdP {
	count?: number; //The number of Ids to return. (default: 10) (range: 1-1000)
	space?: string; //Where the Ids should be applicable for. Values are: drive, appDataFolder
}

export interface GetFileP {
	fileId: string; //File id to get.
	acknowledgeAbuse?: boolean; //Set it to true if the user accepts responsibility for possible malware download. (default: false)
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)		
}

export interface ListFilesP {
	corpora?: string; //Comma seperated list of corpora that this should apply to. Values are: user, domain, teamDrive, allTeamDrives
	includeTeamDriveItems?: boolean; //What it say. (default: false)
	orderBy?: string; //Comma seperated list of keys to sort by. Values are: createdTime, folder, modifiedByMeTime, modifiedTime, name, quotaBytesUsed, recency, sharedWithMeTime, starred, viewedByMeTime. Adding ' desc' to the end of a key reverses it.
	pageSize?: number; //Number of results to return. (default: 100) (range: 1-1000)
	pageToken?: string; //Use this to resume from a previous query.
	q?: string; //Search query. See https://developers.google.com/drive/v3/web/search-parameters for details.
	spaces?: string; //Comma seperated list of spaces to look in. Values are: drive, appDataFolder, photos.
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)
	teamDriveId?: string; //Id of team drive to look in when searching.
}

export interface UpdateFileContentP {
	uploadType: string; //Values are: media (simple upload), multipart, resumable.
	fileId: string; //File id to update
	addParents?: string; //Comma seperated list of parent ids to add.
	keepRevisionForever?: boolean; //Keep this version of the file forever? (default: false)
	ocrLanguage?: string; //Language hint for OCR processing (ISO 639.1)
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)
	useContentAsIndexableText?: boolean; //Marks the content as searchable. (default: false)
}

export interface UpdateFileMetaP {
	fileId: string; //File id to update
	addParents?: string; //Comma seperated list of parent ids to add.
	keepRevisionForever?: boolean; //Keep this version of the file forever? (default: false)
	ocrLanguage?: string; //Language hint for OCR processing (ISO 639.1)
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)
	useContentAsIndexableText?: boolean; //Marks the content as searchable. (default: false)
}

export interface WatchFileP {
	fileId: string; //File id to watch.
	acknowledgeAbuse?: boolean; //Set it to true if the user accepts responsibility for possible malware download. (default: false)
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)		
}

export interface CreatePermissionP {
	fileId: string; //File id to create the permission for.
	sendNotificationEmail?: boolean; //Send an email to the target of the permission? (default: true for user | group) (must be true for ownership transfer)
	emailMessage?: string; //A custom message to send in the notification email.
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)
	transferOwnership?: boolean; //Set to true if changing the owner through this permission. (default: false)
}

export interface DeletePermissionP {
	fileId: string; //File id containing the permission.
	permissionId: string; //Id of permission to delete.
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)
}

export interface GetPermissionP {
	fileId: string; //File id containing the permission.
	permissionId: string; //Id of permission to get.
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)	
}

export interface ListPermissionP {
	fileId: string; //File id containing the permission.
	pageSize?: number; //Number of results to return. No limit on non-team drives (default: 100) (range: 1-100)
	pageToken?: string; //Use this to resume from a previous query.
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)	
}

export interface UpdatePermissionP {
	fileId: string; //File id containing the permission.
	permissionId: string; //Id of permission to update.
	removeExpiration?: boolean; //Remove a previously set expiration date? (default: false)
	supportsTeamDrives?: boolean; //Does this app support team drives? (default: false)	
	transferOwnership?: boolean; //Set to true if changing the owner through this permission. (default: false)
}

export interface DriveR {
	kind?: string; //Identifies what kind of resource this is.
}

export interface UserR extends DriveR {
	displayName?: string; //Plain text displayable name for the user.
	photoLink?: string; //Link to user"s profile picture, if available.
	me?: boolean; //Is this user me?
	permissionId?: string; //User"s id. Used in permission resources.
	emailAddress?: string; //User"s email address.
}

export interface CapabilitiesR {
	canEdit: boolean; //Can the current user edit this doc?
	canComment: boolean; //Can the current user comment?
	canShare: boolean; //Can the user change sharing permissions?
	canCopy: boolean; //Can the user copy the contents of this file? (Or descendents of this folder, if it is a team drive.)
	canReadRevisions: boolean; //Can the user go back in time and look at older versions?

	canAddChildren: boolean; //Can the user add children to this folder? (Always false if item is a file)
	canDelete: boolean; //Can the user delete this?
	canListChildren: boolean; //Can the user see what"s inside this folder? (Always false if item is a file)
	canMoveTeamDriveItems: boolean; //Can the user change this file"s parent? (Team drives only :P)
	canMoveItemIntoTeamDrive: boolean; //Can the user move this file into a team drive? (==canMoveTeamDriveItems if file is in a team drive)
	canReadTeamDrive: boolean; //Can the user look in the team drive this file belongs to? (Team drives only :P)
	canRemoveChildren: boolean; //Can the user remove this file as a parent from its children? (Always false if item is a file)
	canRename: boolean; //Can the user rename this file?
	canTrash: boolean; //Can the user delete this file?
	canUntrash: boolean; //Can the user ressurect this file?
	canChangeViewersCanCopyContent: boolean; //Can the user change the useless setting of allowing viewers to also copy the content of the file?
}

export interface TeamDrivePermissionDetailR { // (Everything in here is Team Drives Only)
	teamDrivePermissionType: string; //Permission type for user. Valid values: file, member.
	role: string; //Role of the user. Valid values: organizer, writer, commenter, reader
	inherited: boolean; //Whether or not this permission is inherited from a parent file (aka folder). Response only.
	inheritedFrom?: string; //Id of item from which permission is inherited. Response only.
}

export interface TeamDriveBackgroundImageR { // (Everything in here is Team Drives Only)
	id?: string; //ID of a theme to use a preset background image.
	xCoordinate?: number; //x percent (starting from left) to start cropping at.
	yCoordinate?: number; //y percent (starting from top) to start cropping at.
	width?: number; //Width percent to crop. E.G. 0.5 = 50% of the original width.
}

export interface TeamDriveCapabilitiesR extends CapabilitiesR {
	canChangeTeamDriveBackground?: boolean; //Can the current user change the background image? (Team drives only :P)
}

export interface TeamDriveR { // (Everything in here is Team Drives Only)
	id?: string; //Id of the team drive. Also the ID of the top-level folder.
	name?: string; //Name of this team drive.
	capabilities?: CapabilitiesR; //Capabilities the current user has.
	themeId?: string; //Id of the theme that the background image / color is derived from. (Request only)
	colorRgb?: string; //6-digit hex color of this drive. Can only be set on a update request that does not set themeId.
	backgroundImageFile?: TeamDriveBackgroundImageR; //Id and cropping of the background image.
	backgroundImageLink?: string; //Temporary link to the background image.
}

export interface PermissionR extends DriveR {
	id?: string; //Id of this permission
	type?: string; //Type this is granted to. Valid values: user, group, domain, anyone.
	emailAddress?: string; //The email address of the user / group that this permission refers to (if type == user | group).
	domain?: string; //The domain this permission refers to (if type == domain).
	role?: string; //Role granted by permission. Valid values: organizer, owner, writer, commenter, reader.
	allowFileDiscovery?: boolean; //Can this file be searched for from the internet. (if type == domain | anyone)
	displayName?: string; //A display name for the grantee. (if type == user | group | domain)
	photoLInk?: string; //Link to profile picture (if type == user)
	expirationTime?: string; //Time this permission will expire (if type == user | group) (RFC 3339) (Max 1 year in the future)
	teamDrivePermissionDetails?: Array<TeamDrivePermissionDetailR>; //Permissions for team drive files. (Team drives only :P)
	deleted?: boolean; //Has the user shown in this permission been deleted? (if type == user)
}

export interface PermissionListR extends DriveR {
	nextPageToken?: string; //Token for continuing to the next page of results.
	permissions: Array<PermissionR>; //List of permissions
}

export interface ImageMediaMetadataR {
	width?: number; //Width in pixels.
	height?: number; //Height in pixels.
	rotation?: number; //Rotation in clockwise degrees.
	location?: {
		latitude: number;
		longitude: number;
		altitude: number;
	};
	time?: string; //Date and time picture was taken (EXIF DateTime).
	cameraMake?: string;
	cameraModel?: string;
	exposureTime?: number; //Exposure time in seconds.
	aperture?: number; //F-number of aperture.
	flashUsed?: boolean;
	focalLength?: number; //Focal length, in millimeters.
	isoSpeed?: number;
	meteringMode?: string;
	sensor?: string; //Sensor used to take the photo.
	exposureMode?: string;
	colorSpace?: string;
	whiteBalance?: string;
	exposureBias?: number; //APEX exposure bias value.
	subjectDistance?: number; //Distance between camera and subject, in meters.
	lens?: string;
}

export interface VideoMediaMetadataR {
	width?: number; //Width in pixels.
	height?: number; //Height in pixels.
	durationMillis?: number; //Duration in milliseconds.
}

export interface ContentHintR {
	thumbnail?: {
		image: string; //RFC 4648.5 Base-64 encoded data
		mimeType: string; //Mime type of image
	};
	indexableText?: string; //Text to be indexed to improve search results. Limited to 128KB. May contain HTML.
}

export interface FileR extends DriveR {
	id?: string; //Id of the file
	name?: string; //Name of the file
	mimeType?: string; //Mime type of the file
	description?: string; //Short description of the file
	starred?: boolean; //Is this file starred?
	trashed?: boolean; //Is this file in the trash?
	explicitlyTrashed?: boolean; //False if parent was trashed, true if the file itself was deleted
	parents?: Array<string>; //Ids of parents
	properties?: any; //Arbitrary key/value pairs visible to all apps.
	appProperties?: any; //Arbitrary key/value pairs private to the requesting app.
	spaces?: Array<string>; //List of spaces this file is available in. Values are drive, appDataFolder, and photos
	version?: number; //The current version of this file.
	webContentLink?: string; //A link for downloading this content in a browser. (Binary files only.)
	webViewLink?: string; //A link for viewing this content in its appropriate editor / viewer.
	iconLink?: string; //Static, unauthenticated link to the file"s thumbnail.
	viewedByMe?: boolean; //Has this file been viewed by the user?
	viewedByMeTime?: string; //Last time the file was viewed by the user (RFC 3339)
	createdTime?: string; //When the file was created. (RFC 3339)
	modifiedTime?: string; //When the file was last modified. (RFC 3339)
	modifiedByMeTime?: string; //When the file was last modified by the user. (RFC 3339)
	sharedWithMeTime?: string; //When the file was shared with the user. (RFC 3339)
	sharingUser?: UserR; //The user that shared the file to the current user.
	loastModifyingUser?: UserR; //Last person to edit the file.
	shared?: boolean; //Has the file been shared? Not used for team drives.
	ownedByMe?: boolean; //Is the file owned by the current user? Not used for team drives.
	viewersCanCopyContent?: boolean; //Can users without write permission copy file contents? (Basically useless, there is always ways to copy it :P)
	writersCanShare?: boolean; //Can people with write access change sharing permissions? Not used for team drives.
	permissions?: Array<PermissionR>; //All permissions for this file. Only shown if the user has sharing permission. Not used for team drives.
	folderColorRgb?: string; //Hex string for folder color. The closest palette color will be picked upon change. (No effect on files, obviously.)
	originalFileName?: string; //Original name of uploaded content, or original name the file was created with. (Binary files only.)
	fullFileExtension?: string; //Extracted from "name". Can contain multiples e.g. ".tar.gz". (Binary files only.)
	fileExtension?: string; //Like fullFileExtension, except e.g. returns .gz instead of .tar.gz
	md5Checksum?: string; //Checksum of the file. (Binary files only.)
	size?: number; //Number of bytes in the file. (Binary files only.)
	quotaBytesUsed?: number; //Like size, but includes revisions with keepForever=true.
	headRevisionId?: string; //ID of current revision. (Binary files only.)
	contentHints?: ContentHintR; //Additional information about content of file. (Not used in responses.)
	imageMediaMetadata?: ImageMediaMetadataR; //Only present if this file is an image.
	videoMediaMetadata?: VideoMediaMetadataR; //Only present if this file is a video.
	capabilities?: CapabilitiesR; //What the user can and cannot do on this file.
	isAppAuthorized?: boolean; //Was the file ever created / opened by the requesting app?
	hasThumbnail?: boolean; //Does this file have a custom thumbnail?
	thumbnailVersion?: number; //Current version of the thumbnail.
	modifiedByMe?: boolean; //Has the file ever been modified by the user?
	trashingUser?: UserR; //If explicitlyTrashed=true, the user who deleted it. (Team drives only)
	trashedTime?: string; //Time this file was trashed. (RFC 3339) (Team drives only)
	teamDriveId?: string; //Id of the team drive this file is in. (Team drives only :P)
	hasAugmentedPermissions?: boolean; //True if the user is directly granted access to this file. (Team drives only)
}

export interface FileListR extends  DriveR {
	nextPageToken?: string; //Token to continue to the next page of results.
	incompleteSearch?: boolean; //Are there more files on the next page?
	files: Array<FileR>; //List of files.
}

export interface QuotedFileContentR {
	mimeType: string; //Mime type of quoted content.
	value: string; //The actual quoted content.
}

export interface ReplyR extends DriveR {
	id?: string; //Id of this reply.
	createdTime?: string; //Time the reply was created. (RFC 3339)
	modifiedTime?: string; //Last time the reply was modified. (RFC 3339)	
	author?: UserR; //User that created this reply.
	htmlContent?: string; //HTML-formatted reply content. (Response only)
	content?: string; //Plain-text reply content. (Request only)
	deleted?: boolean; //Is this reply deleted? (Content will be empty)
	action?: string; //If the reply changed anything. Values are: resolve, reopen.
}

export interface CommentR extends DriveR {
	id?: string; //Id of the comment.
	createdTime?: string; //Time the comment was created. (RFC 3339)
	modifiedTime?: string; //Last time the comment or its replies were modified. (RFC 3339)
	author?: UserR; //User that created this comment.
	htmlContent?: string; //HTML-formatted comment content. (Response only)
	content?: string; //Plain-text comment content. (Request only)
	deleted?: boolean; //Is this comment deleted? (Content will be empty)
	resolved?: boolean; //Has this comment been resolved?
	quotedFileContent?: QuotedFileContentR; //Description of what content this comment quotes.
	anchor?: string; //JSON string describing what section of the document is quoted. (Docs has documentation on this for their file format.)
	replies?: Array<ReplyR>; //Replies to this comment.
}

export interface CommentListR extends DriveR {
	nextPageToken?: string; //Token to continue listing comments.
	comments: Array<CommentR>; //A list of comments.
}

export interface ChangeR extends DriveR {
	type: string; //Can be file or teamDrive
	time: string; //Time of the change (RFC 3339)
	removed: boolean; //Whether the file or team drive has been removed from the list of changes (deletion or loss of access)
	fileId: string; //Id of the changed file
	file?: FileR; //Updated state of the file. Present if removed is false and type is file
	teamDriveId?: string; //Id of the team drive this file is in. (Team drives only :P)
	teamDrive?: TeamDriveR; //Team drive this file is in. (Team drives only :P)
}

export interface ChangeListR extends DriveR {
	nextPageToken: string; //Token to view the next page of changes.
	newStartPageToken?: string; //Token where future changes will start. Only included if the end of the list has been reached.
	changes: Array<ChangeR>; //Changes made.
}

export interface IdListR extends DriveR {
	space: string; //The type of file that can be created with these ids. Either drive or appDataFolder
	ids: Array<string>; //The ids.
}

export interface ChannelR extends DriveR {
	id: string; //UUID or similar identifier for this channel.
	resourceId: string; //Id identifiying watched resource. Same across different API versions.
	resourceUri: string; //Version-specific resource id
	token?: string; //Optional arbitrary string delivered with each notification.
	expiration?: number; //Optional unix timestamp of when this watch will expire.
	type: string; //Delivery mechanism used for this channel.
	address: string; //Address where notifications are delivered.
	payload?: boolean; //Optional, is payload wanted?
	params?: any; //Optional arbitrary key / value pairs to control channel behavior.
}

export interface StartPageTokenR extends DriveR {
	startPageToken: string; //The starting page token for listing changes.
}

export interface ListChangesR extends DriveR {
	nextPageToken: string;
	newStartPageToken: string;
	changes: Array<ChangeR>;
}

export namespace DriveUtil {
	const FILE_KIND = "drive#file";
	export function newFile(name?: string, mimeType?: string, parents?: Array<string>, extraData?: {}): FileR {
		let tr: FileR;
		tr = {kind: FILE_KIND};
		if(name) {
			tr.name = name;
		}
		if(mimeType) {
			tr.mimeType = mimeType;
		}
		if(parents) {
			tr.parents = parents;
		}
		Object.assign(tr, extraData); //Add extra key/value pairs to the file.
		return tr;
	}
	
	export function existingFile(id?: string, extraData?: {}): FileR {
		let tr: FileR;
		tr = {kind: FILE_KIND};
		if(id) {
			tr.id = id;
		}
		Object.assign(tr, extraData); //Add extra key/value pairs to the file.
		return tr;
		
	}
}

var DRIVE_URL = "https://www.googleapis.com/drive/v3";

@Injectable()
export class DriveService {	
	constructor(private gapiService: GapiService) {
		gapiService.loaded.listen((v: boolean) => this.onLoad(v));
	}
	
	private onLoad(loaded: boolean) {
		this.changes.request = this.gapiService.client.request;
		this.channels.request = this.gapiService.client.request;
		this.comments.request = this.gapiService.client.request;
		this.files.request = this.gapiService.client.request;	
		this.permissions.request = this.gapiService.client.request;		
	}
	
	changes = {
		request: null,
		getStartPageToken(params: GetStartPageTokenP): Promise<StartPageTokenR> {
			return this.request({
				method: "GET",
				path: DRIVE_URL + "/changes/startPageToken",
				params: params
			});
		},
		list(params: ListChangesP): Promise<ChangeListR> {
			return this.request({
				method: "GET",
				path: DRIVE_URL + "/changes",
				params: params
			});
		},
		watch(params: WatchChangesP, body: ChannelR): Promise<ChannelR> {
			return this.request({
				method: "POST",
				path: DRIVE_URL + "/changes/watch",
				params: params,
				body: body
			});
		}
	};
	
	channels = {
		request: null,
		stop(params: EmptyP, body: ChannelR): Promise<EmptyR> {
			return this.request({
				method: "POST",
				path: DRIVE_URL + "/channels/stop",
				params: params,
				body: body
			});
		}
	};
	
	comments = {
		request: null,
		create(params: CreateCommentP, body: CommentR): Promise<CommentR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/coments";
			delete params.fileId;
			return this.request({
				method: "POST",
				path: path,
				params: params,
				body: body
			});
		},
		delete(params: DeleteCommentP): Promise<EmptyR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/comments/" + params.commentId;
			delete params.fileId, params.commentId;
			return this.request({
				method: "DELETE",
				path: path,
				params: params
			});
		},
		get(params: GetCommentP): Promise<CommentR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/comments/" + params.commentId;
			delete params.fileId, params.commentId;
			return this.request({
				method: "GET",
				path: path,
				params: params
			});
		},
		list(params: ListCommentsP): Promise<CommentListR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/comments";
			delete params.fileId;
			return this.request({
				method: "GET",
				path: path,
				params: params
			})
		},
		update(params: UpdateCommentP, body: CommentR): Promise<CommentR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/comments" + params.commentId;
			delete params.fileId, params.commentId;
			return this.request({
				method: "PATCH",
				path: path,
				params: params,
				body: body
			})
		}
	};
	
	files = {
		request: null,
		copy(params: CopyFileP, body: FileR): Promise<FileR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/copy";
			delete params.fileId;
			return this.request({
				method: "POST",
				path: path,
				params: params,
				body: body
			})
		},
		createMetaOnly(params: CreateFileMetaOnlyP, body: FileR): Promise<FileR> {
			return this.request({
				method: "POST",
				path: DRIVE_URL + "/files",
				params: params,
				body: body
			})
		},
		delete(params: DeleteFileP): Promise<EmptyR> {
			let path = DRIVE_URL + "/files/" + params.fileId;
			delete params.fileId;
			return this.request({
				method: "DELETE",
				path: path,
				params: params
			})
		},
		emptyTrash(params: EmptyTrashP): Promise<EmptyR> {
			return this.request({
				method: "DELETE",
				path: DRIVE_URL + "files/trash",
				params: params
			})
		},
		export(params: ExportFileP): Promise<FileR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/export";
			delete params.fileId;
			return this.request({
				method: "GET",
				path: path,
				params: params
			})
		},
		generateIds(params: GenerateIdP): Promise<IdListR> {
			return this.request({
				method: "GET",
				path: DRIVE_URL + "/files/generateIds",
				params: params
			})
		},
		get(params: GetFileP): Promise<FileR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/copy";
			delete params.fileId;
			return this.request({
				method: "GET",
				path: path,
				params: params
			})
		},
		list(params: ListFilesP): Promise<FileListR> {
			return this.request({
				method: "GET",
				path: DRIVE_URL + "/files/",
				params: params
			})
		},
		updateMeta(params: UpdateFileMetaP, body: FileR): Promise<FileR> {
			let path = DRIVE_URL + "/files/" + params.fileId;
			delete params.fileId;
			return this.request({
				method: "PATCH",
				path: path,
				params: params,
				body: body
			})
		},
		watch(params: WatchFileP, body: ChannelR): Promise<ChannelR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/watch";
			delete params.fileId;
			return this.request({
				method: "POST",
				path: path,
				params: params,
				body: body
			})
		},
	};
	
	permissions = {
		request: null,
		create(params: CreatePermissionP, body: PermissionR): Promise<PermissionR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/permissions";
			delete params.fileId;
			return this.request({
				method: "POST",
				path: path,
				params: params,
				body: body
			})
		},
		delete(params: DeletePermissionP): Promise<EmptyR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/permissions/" + params.permissionId;
			delete params.fileId, params.permissionId;
			return this.request({
				method: "DELETE",
				path: path,
				params: params
			})
		},
		get(params: GetPermissionP): Promise<PermissionR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/permissions/" + params.permissionId;
			delete params.fileId, params.permissionId;
			return this.request({
				method: "GET",
				path: path,
				params: params
			})
		},
		list(params: ListPermissionP): Promise<PermissionListR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/permissions";
			delete params.fileId;
			return this.request({
				method: "GET",
				path: path,
				params: params
			})
		},
		update(params: UpdatePermissionP, body: PermissionR): Promise<PermissionR> {
			let path = DRIVE_URL + "/files/" + params.fileId + "/permissions/" + params.permissionId;
			delete params.fileId, params.permissionId;
			return this.request({
				method: "PATCH",
				path: path,
				params: params,
				body: body
			})
		},
	};
	
	//TODO: Replies, Revisions, Teamdrives
}















