import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EditorComponent } from "app/editors/editor.component";
import { CollaborativeList, CollaborativeMap } from "app/gwrap/realtime.service";

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
	readonly litTermsAndArchetypes = ["Allegory", "Alliteration", "Allusion", "Analogy", "Anecdote", "Antagonist", "Archetype", 
	                                  "Assonance", "Direct Characterization", "Indirect Characterization", "Static Character", 
	                                  "Flat Character", "Round Character", "Dynamic Character", "Climax", "Conflict", 
	                                  "External Conflict", "Internal Conflict", "Connotation", "Denotation", "Diction", "Epiphany", 
	                                  "Epithet", "Fable", "Fairy Tale", "Simile", "Metaphor", "Personification", "Hyperbole", 
	                                  "Onomatopoeia", "Symbol", "Understatement", "Flashback", "Foil", "Foreshadowing", "Genre", 
	                                  "Imagery", "Verbal Irony", "Situational Irony", "Dramatic Irony", "Maxim", "Mood", "Motif", 
	                                  "Motivation", "Narrator", "Novel", "Oxymoron", "Parable", "Paradox", "Parallelism", "Parody", 
	                                  "Plot", "1st Person Point of View", "3rd Person Limited Point of View", "Protagonist", "Satire", 
	                                  "Setting", "Stereotype", "Suspense", "Theme", "Tone", "Wit", "The Quest", "The Task (Test)", 
	                                  "The Journey (Departure)", "The Initiation", "The Ritual (Rite of Passage)", "The Fall", 
	                                  "Death (Descent into the Underworld) and Resurrection (Rebirth)", "Nature vs. Mechanistic World", 
	                                  "Good vs. Evil", "The Unhealable Wound", "The Magic Weapon", "The Hero in Disguise", 
	                                  "Light vs. Darkness", "Water vs. Desert", "Water vs. Desert", "Heaven vs. Hell", "Haven vs. Wilderness", 
	                                  "Divine (Supernatural) Intervention", "The Hero", "Young Person from the Provinces", "The Initiates", 
	                                  "Mentor/Pupil", "Father-Son Conflict", "Hunting Group of Companions", "Loyal Retainers", 
	                                  "Friendly Beast", "Threshold Guardians", "The Devil Figure", "The Evil Figure with the Ultimately Good Heart", 
	                                  "The Scapegoat", "Innate Wisdom vs. Educated Stupidity", "The Outcast", "The Earth Mother", 
	                                  "The Temptress (Seductress)", "The Platonic Ideal", "The Unfaithful Wife", "The Damsel in Distress", 
	                                  "The Star-Crossed Lovers", "The Creature of Nightmare", "Sibling Rivalry"].sort();
	readonly characterTemplate = {
			names: [["New Character", ""]],
			description: "A character that was just added.",
			relations: [],
			archetypes: []
	};
	static readonly characterRelationTypes = ["Parent", "Child", "Superior", "Subordinate", "Friend", "Spouse"];
	static readonly characterRelationInverses = ["Child", "Parent", "Subordinate", "Superior", "Friend", "Spouse"];
	readonly nameTemplate = ["New Name", ""];
	readonly relationTemplate = ["null", "null", ""];
	readonly archetypeTemplate = ["null", ""];
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
	static readonly placeRelationTypes = ["North of", "South of", "East of", "West of", "Above", "Below", "Inside of", "Contains"]; 
	
	get defaultDataStructure(): any {
		return {
			characters: [{
				names: [["Example Character", ""], ["P.R. Son", "Nickname given to them by someone."]], 
				description: "This character is important to the story.", 
				relations: [["Father", "null", "Both of them hate each other."], ["Daughter", "null", "They get along just fine."]],
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
				relations: [["South of", "null", ""]],
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
	
	get BookEditorComponent() {
		return BookEditorComponent;
	}
	
	get global() {
		return BookEditorComponent;
	}
	
	constructor(private _cdr: ChangeDetectorRef) {
		super(_cdr);
	}
	
	inverseCharacterRelation(rtype: string): string {
		let index = BookEditorComponent.characterRelationTypes.indexOf(rtype);
		if(index === -1) {
			return "null";
		} else {
			return BookEditorComponent.characterRelationInverses[index];
		}
	}
	
	inversePlaceRelation(rtype: string): string {
		let index = BookEditorComponent.placeRelationTypes.indexOf(rtype);
		if(index === -1) {
			return "null"
		} else {
			if(index % 2 === 0) {
				return BookEditorComponent.placeRelationTypes[index+1];
			} else {
				return BookEditorComponent.placeRelationTypes[index-1];
			}
		}
	}
	
	setRelationType(array: string, inverseFunc: (rtype: string) => string, object: CollaborativeMap, relation: CollaborativeList, newType: string) {
		this.beginCompoundOperation();
		let oldType: string = relation.get(0).text;
		let thisId = object.id;
		//Find the opposites of what the relation used to be and what it is now.
		let oldInverse = inverseFunc(oldType),
			newInverse = inverseFunc(newType);
		//Find the object at whom the relation is targeted at.
		let recipient: CollaborativeMap = null;
		for(let obj of this.getPath(array).asArray()) {
			if(obj.id === relation.get(1).text) {
				recipient = obj;
				break;
			}
		}
		//If a target was found, make sure that their copy of the relation is changed appropriatley.
		if(recipient) {
			let exists = false;
			//If a relationship with the original object already exists, update its type.
			for(let relation of recipient.get("relations").asArray()) {
				if((relation.get(1).text === thisId) && 
						(relation.get(0).text === oldInverse)) {
					relation.get(0).text = newInverse;
					exists = true;
					break;
				}
			}
			//Otherwise, add a new relation to the targeted object.
			if(!exists) {
				let description =  "(Copied from " + object.get("names").get(0).get(0).text + "): " + relation.get(2).text;
				recipient.get("relations").push(this.realtime.createCollaborativeObjectFromObject(
						[newInverse, thisId, description]));
			}
		}
		relation.get(0).text = newType;
		this.endCompoundOperation();
	}
	
	setRelationTarget(array: string, inverseFunc: (rtype: string) => string, object: CollaborativeMap, relation: CollaborativeList, newTargetId: string) {
		this.beginCompoundOperation();
		let oldTargetId: string = relation.get(1).text;
		let thisId = object.id;
		//Find the inverse of the current relation type.
		let rtype = relation.get(0).text, inverseType = inverseFunc(rtype);
		//Try to find the object the relation used to refer to, as well as the object the user is trying to set it to.
		let oldTarget: CollaborativeMap = null, newTarget: CollaborativeMap = null;
		for(let obj of this.getPath(array).asArray()) {
			if(obj.id === oldTargetId) {
				oldTarget = obj;
			} else if(obj.id == newTargetId) {
				newTarget = obj;
			}
			if(oldTarget && newTarget) {
				break;
			}
		}
		//A placeholder description if another one is not available.
		let description =  "(Copied from " + object.get("names").get(0).get(0).text + "): " + relation.get(2).text;
		if(oldTarget) {
			let index = 0;
			//If the old object has a relation with the original object, copy its description and delete that relation.
			for(let relation of oldTarget.get("relations").asArray()) {
				if((relation.get(1).text === thisId) &&
						(relation.get(0).text === inverseType)) {
					description = relation.get(2).text;
					oldTarget.get("relations").remove(index);
					break;
				}
				index++;
			}
		}
		if(newTarget) {
			//Add a relation to the new object, with the inverse of the relation type. Use either the placeholder description or the copied one.
			newTarget.get("relations").push(this.realtime.createCollaborativeObjectFromObject(
					[inverseType, thisId, description]))
		}
		relation.get(1).text = newTargetId;
		this.endCompoundOperation();		
	}
	
	removeRelation(array: string, inverseFunc: (rtype: string) => string, object: CollaborativeMap, rindex: number) {
		this.beginCompoundOperation();
		let toRemove = object.get("relations").get(rindex);
		let thisId = object.id;
		for(let obj of this.getPath(array).asArray()) {
			//Find the object targeted by this relation.
			if(obj.id === toRemove.get(1).text) {
				//Check if it has any relations pointing to the original object.
				let index = 0;
				let inverse = inverseFunc(toRemove.get(0).text);
				for(let rel of obj.get("relations").asArray()) {
					if((rel.get(1).text === thisId) && 
							(rel.get(0).text === inverse)) {
						//Delete it if it is the compliment of the relation that is being deleted.
						obj.get("relations").remove(index);
						break;
					}
					index++;
				}
				break;
			}
		}
		object.get("relations").remove(rindex);
		this.endCompoundOperation();
	}
	
	setCharacterRelationType(character: CollaborativeMap, relation: CollaborativeList, newType: string) {
		this.setRelationType("characters", this.inverseCharacterRelation, character, relation, newType);
	}
	
	setCharacterRelationTarget(character: CollaborativeMap, relation: CollaborativeList, newTargetId: string) {
		this.setRelationTarget("characters", this.inverseCharacterRelation, character, relation, newTargetId)
	}
	
	removeCharacterRelation(character: CollaborativeMap, rindex: number) {
		this.removeRelation("characters", this.inverseCharacterRelation, character, rindex);
	}
	
	setPlaceRelationType(place: CollaborativeMap, relation: CollaborativeList, newType: string) {
		this.setRelationType("places", this.inversePlaceRelation, place, relation, newType);
	}
	
	setPlaceRelationTarget(place: CollaborativeMap, relation: CollaborativeList, newTargetId: string) {
		this.setRelationTarget("places", this.inversePlaceRelation, place, relation, newTargetId)
	}
	
	removePlaceRelation(place: CollaborativeMap, rindex: number) {
		this.removeRelation("places", this.inversePlaceRelation, place, rindex);
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
