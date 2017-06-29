import { Component, OnInit } from '@angular/core';
import { Fact, Column, FactSet } from './fact/fact-data';
import { FactSetService } from './fact/fact-set.service';

@Component
({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{
	title = 'app works!';
	factSet: FactSet;
	selected: Fact;
	
	constructor(private factSetService: FactSetService)
	{
		
	}
	
	ngOnInit(): void
	{
		this.factSetService.getFactSet().then(factSet => this.factSet = factSet); //Grab the data from the promise, once it's done.
	}
	
	onSelect(fact: Fact): void
	{
		this.selected = fact;
	}
}
