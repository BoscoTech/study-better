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
	selected: Fact;
	
	select(fact: Fact): void
	{
		this.selected = fact;
	}
	
	trackByIndex(index: number, obj: any): any
	{
		return index;
	}
}
