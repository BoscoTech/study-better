import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormattedInputComponent } from '../../format/formatted-input.component';
import { Formats } from '../../format/formats';
import { Fact, FactSet } from '../fact-data';

@Component
({
	selector: 'fact-set-disp',
	templateUrl: './fact-set-disp.component.html',
	styleUrls: ['./fact-set-disp.component.css']
})

export class FactSetDispComponent
{
	@Input() factSet: FactSet;
	@ViewChild("formatSelectors") formatSelectors: ElementRef;
	readonly COLUMN_HEADER_SELECTED = 1;
	selected: any;
	
	constructor(private cdr: ChangeDetectorRef) { }
	
	ngAfterViewInit() {
		for(let i=0; i< this.factSet.columns.length; i++) {
			this.updateFormatSelector(i);
		}		
	}
	
	select(selected: any): void {
		this.selected = selected;
	}
	
	trackByIndex(index: number, obj: any): any {
		return index;
	}
	
	newFact(): void {
		this.factSet.appendBottom();
		this.select(null);
	}
	
	updateFormatSelector(col: number): void {
		let selector = this.formatSelectors.nativeElement.children[col].children[0].children[0];
		for(let i=0; i< selector.options.length; i++) {
			if(selector.options[i].value == this.factSet.columns[col].format) {
				selector.selectedIndex = i;
				return;
			}
		}
	}
	
	getFormatName(col: number): string {
		return Formats.Names[this.factSet.columns[col].format];
	}
	
	getFormat(col: number): string {
		return this.factSet.columns[col].format;
	}
	
	getFormatter(col: number): string {
		return Formats[this.factSet.columns[col].format];
	}
	
	changeFormat(col: number, format: string): void {
		this.factSet.columns[col].format = format;
		this.cdr.markForCheck();
	}
	
	moveRight(col: number): void {
		this.factSet.moveRight(col);
		this.updateFormatSelector(col);
		if(col< this.factSet.columns.length-1) {
			this.updateFormatSelector(col+1);
		}
	}
	
	moveLeft(col: number): void {
		this.factSet.moveLeft(col);
		this.updateFormatSelector(col);
		if(col>0) {
			this.updateFormatSelector(col-1);
		}
	}
	
	addCol(col: number): void {
		this.factSet.appendRight(col);
	}
	
	delCol(col: number): void {
		this.factSet.removeCol(col);
	}
}
