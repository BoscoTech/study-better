import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EditorComponent } from "app/editors/editor.component";

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
	get defaultDataStructure(): any {
		return {
			characters: [],
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
	
	constructor(private _cdr: ChangeDetectorRef) {
		super(_cdr);
	}
}
