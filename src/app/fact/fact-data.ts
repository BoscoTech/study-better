export class Fact 
{
	props: string[];

	constructor(size: number)
	{
		this.props = new Array<string>(size);
		for(var i = 0; i < size; i++)
		{
			this.props[i] = "Prop " + i.toString();
		}
	}
}

export class Column
{
	name = '';
	format = '';

	constructor(name?: string, format?: string)
	{
		if(format)
		{
			this.name = name;
			this.format = format;
		}
	}
}

export class FactSet
{
	columns: Column[];
	facts: Fact[];

	constructor(columns: number, facts: number)
	{
		this.columns = new Array<Column>(0);
		for(var i = 0; i < columns; i++)
		{
			this.columns.push(new Column("New Column", "plainText"));
		}
		this.facts = new Array<Fact>(0);
		for(var i = 0; i < facts; i++)
		{
			this.facts.push(new Fact(columns));
		}
	}
}
