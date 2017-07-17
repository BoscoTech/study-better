import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { EditorComponent } from '../editor.component';
import { Formats } from "app/format/formats";
import { CollaborativeString } from "app/gwrap/realtime.service";

@Component({
  selector: 'fact-set-editor',
  templateUrl: './fact-set-editor.component.html',
  styleUrls: ['./fact-set-editor.component.css']
})
export class FactSetEditorComponent extends EditorComponent {
	@ViewChild("formatSelectors") formatSelectors: ElementRef;
	readonly COLUMN_HEADER_SELECTED = 1; //if selected===this, then the column header is selected.
	selected: any;
	
	get defaultDataStructure(): any {
		return {
			headers: [{
				name: 'Column 1',
				format: 'plainText'
			}, {
				name: 'Column 2',
				format: 'plainText'
			}],
			data: [['Term 1', 'Term 2'], 
			       ['Term 3', 'Term 4']]
		}
	}
	
	get mimeType(): any {
		return "application/prs.study-better.fact-set";
	}
	
	get numFacts(): number {
		return this.getPath('data').length;
	}
	
	get numCols(): number {
		return this.getPath('headers').length;
	}
	
	constructor(private _cdr: ChangeDetectorRef) {
		super(_cdr);
	}
	
	select(selected: any): void {
		this.selected = selected;
	}
	
	trackByIndex(index: number, obj: any): any {
		return index;
	}
	
	updateFormatSelector(col: number): void {
		if(this.editing && this.editingRoot && this.formatSelectors.nativeElement.children[col]) {
			let selector = this.formatSelectors.nativeElement.children[col].children[0].children[0];
			for(let i=0; i< selector.options.length; i++) {
				if(selector.options[i].value == this.getFormat(col).getText()) {
					selector.selectedIndex = i;
					return;
				}
			}
		}
	}
	
	ngAfterContentChecked(): void {
		if(this.editing && this.editingRoot) {
			for(let i=0; i< this.numCols; i++) {
				this.updateFormatSelector(i);
			}
		}
	}
	
	getFormat(col: number): CollaborativeString {
		return this.getPath('headers', col, 'format');
	}
	
	getFormatName(col: number): string {
		return Formats.Names[this.getFormat(col).getText()];
	}
	
	getFormatter(col: number): string {
		return Formats[this.getFormat(col).getText()];
	}
	
	changeFormat(col: number, format: string): void {
		this.getPath('headers', col, 'format').text = format;
		this.cdr.markForCheck();
	}
	
	moveRight(col: number): void {
		if(col< this.numCols - 1) {
			this.beginCompoundOperation();
			this.getPath('headers').move(col+1, col); //Swap the two columns
			this.updateFormatSelector(col);
			this.updateFormatSelector(col+1);
			for(let i=0; i< this.numFacts; i++) {
				this.getPath('data', i).move(col+1, col);
			}
			this.endCompoundOperation();
			this.cdr.detectChanges();
		}
	}
	
	moveLeft(col: number): void {
		if(col>0) {
			this.beginCompoundOperation();
			this.getPath('headers').move(col, col-1); //Swap the two columns
			this.updateFormatSelector(col);
			this.updateFormatSelector(col-1);
			for(let i=0; i< this.numFacts; i++) {
				this.getPath('data', i).move(col, col-1);
			}
			this.endCompoundOperation();
			this.cdr.detectChanges();
		}		
	}
	
	addCol(): void {
		this.beginCompoundOperation();
		let ch = this.createMap();
		this.getPath('headers').push(ch);
		ch.set('name', this.createString('New Column'));
		ch.set('format', this.createString('plainText'));
		for(let i=0; i< this.numFacts; i++) {
			this.getPath('data', i).push(this.createString('Term'));
		}
		this.endCompoundOperation();
	}
	
	delCol(col: number): void {
		this.beginCompoundOperation();
		this.getPath('headers').remove(col);
		for(let i=0; i< this.numFacts; i++) {
			this.getPath('data', i).remove(col);
		}
		this.endCompoundOperation();
	}
	
	moveUp(fact: number): void {
		if(fact>0) {
			this.getPath('data').move(fact, fact-1);
		}
	}
	
	moveDown(fact: number): void {
		if(fact< this.numFacts-1) {
			this.getPath('data').move(fact+1, fact);
		}
	}
	
	addFact(): void {
		this.beginCompoundOperation();
		let vars = new Array<CollaborativeString>();
		for(let i=0; i< this.numCols; i++) {
			vars.push(this.createString("Term " + (i+1).toString()));
		}
		this.getPath('data').push(this.createList(vars));
		this.endCompoundOperation();
	}
	
	delFact(fact: number): void {
		this.getPath('data').remove(fact);
	}
}

