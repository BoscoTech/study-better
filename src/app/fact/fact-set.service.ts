import { Injectable } from '@angular/core';

import { FactSet, Fact } from './fact-data';

@Injectable()
export class FactSetService 
{
	factSet = new FactSet(3, 10);
	
	getFactSet(): Promise<FactSet>
	{
		return Promise.resolve(this.factSet);
	}
}
