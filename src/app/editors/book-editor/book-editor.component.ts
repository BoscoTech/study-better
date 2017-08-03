import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EditorComponent } from "app/editors/editor.component";
import { CollaborativeList } from "app/gwrap/realtime.service";

/**
 * Spec:
 * 
 * Character
 *   Name(s)
 *   Brief description
 *   Details (all are optional)
 *     Time of birth
 *     Place of birth
 *     etc.
 *     and custom ones
 *   Related characters
 *   Group memberships
 *   Other facts
 *   Lit terms
 * Group (of characters)
 *   Name(s)
 *   Brief description
 *   Who is involved
 *   Lit terms
 * Event
 *   Name(s)
 *   Brief description
 *   Related characters
 *   Lit terms
 * Object
 *   Name(s)
 *   Brief description
 *   Lit terms
 * Group (of objects)
 *   Name(s)
 *   Brief description
 *   Objects in it
 *   lit terms
 * Place
 *   Name(s)
 *   Relations to other places
 *   Lit terms
 */

@Component({
  selector: 'book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.css']
})
export class BookEditorComponent extends EditorComponent {
	readonly characterTemplate = {
			names: [["New Character", ""]],
			description: "A character that was just added.",
			relationships: [],
			archetypes: []
	};
	readonly nameTemplate = ["New Name", ""];
	readonly relationshipTemplate = ["Friend", "Someone", ""];
	readonly archetypeTemplate = ["", ""];
	
	get defaultDataStructure(): any {
		return {
			characters: [{names: [["Example Character", ""], ["P.R. Son", "Nickname given to them by someone."]], 
				description: "This character is important to the story.", 
				relationships: [["Father", "someone", "Both of them hate each other."], ["Daughter", "no one", "They get along just fine."]],
				archetypes: [["Father-Son Conflict", "Example Character and someone hate each other.\n'I hate you, dad!' (Author, 123)"],
				             ["Hero", "Brings back the Thing, which causes world peace.\n'Finally, the Thing has brought world peace!' (Author, 321)"]]}],
			cgroups: [],
			events: [],
			objects: [],
			ogroups: [],
			places: []
		}
	}
	
	get hrName(): string {
		return "Book Notes";
	}
	
	get mimeType(): string {
		return "application/prs.study-better.book";
	}
	
	get log(): any {
		return window.console.log;
	}
	
	constructor(private _cdr: ChangeDetectorRef) {
		super(_cdr);
	}
	
	createDeleteIndexButton(list: CollaborativeList, index: number) {
		return {click: () => {
				this.realtime.beginCompundOperation();
				list.remove(index);
				this.realtime.endCompoundOperation();
		}};
	}
	
	createPushObjectButton(list: CollaborativeList, pushTemplate: any) {
		return {click: () => {
			this.realtime.beginCompundOperation();
			let realtimeObject = this.realtime.createCollaborativeObjectFromObject(pushTemplate);
			list.push(realtimeObject); 
			this.realtime.endCompoundOperation();
		}};
	} 
}
