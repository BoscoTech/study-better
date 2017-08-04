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
	readonly relationshipTemplate = ["Friend", "null", ""];
	readonly archetypeTemplate = ["", ""];
	readonly eventTemplate = {
			names: [["New Event", ""]],
			description: "An event that was just added.",
			characters: [],
			archetypes: []
	};
	readonly characterRefTemplate = ["null", ""];
	readonly characterGroupTemplate = {
			names: [["New Character Group", ""]],
			description: "A character group that was just added.",
			characters: [],
			archetypes: []
	};
	readonly objectTemplate = {
			names: [["New Object", ""]],
			description: "An object that was just added.",
			archetypes: []
	};
	readonly objectGroupTemplate = {
			names: [["New Object Group", ""]],
			description: "An object group that was just added.",
			objects: [],
			archetypes: []
	};
	readonly objectRefTemplate = this.characterRefTemplate;
	readonly placeTemplate = {
			names: [["New Place", ""]],
			description: "A place that was just added.",
			relations: [],
			archetypes: []
	};
	readonly placeRefTemplate = ["null", "null"];
	
	get defaultDataStructure(): any {
		return {
			characters: [{
				names: [["Example Character", ""], ["P.R. Son", "Nickname given to them by someone."]], 
				description: "This character is important to the story.", 
				relationships: [["Father", "null", "Both of them hate each other."], ["Daughter", "null", "They get along just fine."]],
				archetypes: [["Father-Son Conflict", "Example Character and someone hate each other.\n'I hate you, dad!' (Author, 123)"],
				             ["Hero", "Brings back the Thing, which causes world peace.\n'Finally, the Thing has brought world peace!' (Author, 321)"]]
			}],
			cgroups: [],
			events: [{
				names: [["Example Event", ""]],
				description: "The event that changed everything.",
				characters: [["null", "They made the event happen."]],
				archetypes: [["Climax", "It was the climax of the story.\n'This is the moment where nothing will be the same!' (Author, 222)"]]
			}],
			objects: [{
				names: [["Example Object", ""]],
				description: "The Thing that brought world peace.",
				archetypes: [["Wit", "It's witty.\n'This Thing is witty.' (Author, 111)"]]
			}],
			ogroups: [],
			places: [{
				names: [["Example Place", ""]],
				description: "Home of the Thing.",
				relations: ["South of", "null"],
				archetypes: [["Haven vs. Wilderness", "It's better than the surrounding wilderness.\n'I'm sure glad that we found this haven in the middle of the wilderness!' (Author, 333)"]]
			}]
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
