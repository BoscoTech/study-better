import { Component } from '@angular/core';
import { Fact, Column, FactSet } from './fact/fact-data';

@Component
({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent 
{
	title = 'app works!';
	factSet = new FactSet(3, 10);
	selected: Fact;
	
	onSelect(fact: Fact): void
	{
		this.selected = fact;
	}
}
