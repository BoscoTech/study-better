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
	
	moveLeft(index: number): void
	{
		if(index > 0)
		{
			let tmp = this.props[index];
			this.props[index] = this.props[index-1];
			this.props[index-1] = tmp;
		}
	}
	
	moveRight(index: number): void
	{
		if(index < this.props.length-1)
		{
			let tmp = this.props[index];
			this.props[index] = this.props[index+1];
			this.props[index+1] = tmp;
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
			this.columns.push(new Column("Column " + i.toString(), "plainText"));
		}
		this.facts = new Array<Fact>(0);
		for(var i = 0; i < facts; i++)
		{
			this.facts.push(new Fact(columns));
			this.facts[i].props[0] = "Fact " + i.toString();
		}
	}
	
	moveUp(index: number): void
	{
		if(index > 0)
		{
			let tmp = this.facts[index];
			this.facts[index] = this.facts[index-1];
			this.facts[index-1] = tmp;
		}
	}
	
	moveDown(index: number): void
	{
		if(index < this.facts.length-1)
		{
			let tmp = this.facts[index];
			this.facts[index] = this.facts[index+1];
			this.facts[index+1] = tmp;
		}
	}
	
	moveLeft(index: number): void
	{
		if(index > 0)
		{
			let tmp = this.columns[index];
			this.columns[index] = this.columns[index-1];
			this.columns[index-1] = tmp;
			for(var i = 0; i < this.facts.length; i++)
			{
				this.facts[i].moveLeft(index);
			}
		}
	}
	
	moveRight(index: number): void
	{
		if(index < this.facts.length-1)
		{
			let tmp = this.columns[index];
			this.columns[index] = this.columns[index+1];
			this.columns[index+1] = tmp;
			for(var i = 0; i < this.facts.length; i++)
			{
				this.facts[i].moveRight(index);
			}
		}
	}
	
	append(): void
	{
		this.facts.push(new Fact(this.columns.length));
	}
	
	remove(index: number): void
	{
		this.facts.splice(index, 1);
	}
}
