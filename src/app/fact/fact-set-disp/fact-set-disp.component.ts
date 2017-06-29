import { Component, Input } from '@angular/core';

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
	readonly COLUMN_HEADER_SELECTED = 1;
	selected: any;
	
	select(selected: any): void
	{
		this.selected = selected;
	}
	
	trackByIndex(index: number, obj: any): any
	{
		return index;
	}
	
	newFact(): void
	{
		this.factSet.append();
		this.select(null);
	}
}
