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

	constructor(columns?: number, facts?: number)
	{
		if(facts != undefined) {
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
		} else {
			this.columns = [new Column("Term", "plainText"), new Column("Definition", "plainText")];
			this.facts = [new Fact(2), new Fact(2)];
			this.facts[0].props = ["Term 1", "Definition 1"];
			this.facts[1].props = ["Term 2", "Definition 2"];
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
	
	appendBottom(): void
	{
		this.facts.push(new Fact(this.columns.length));
	}
	
	removeRow(row: number): void
	{
		this.facts.splice(row, 1);
	}
	
	appendRight(col: number): void {
		let cols = this.columns.length;
		this.columns.splice(col+1, 0, new Column("New Column", "plainText"));
		for(let f=0; f< this.facts.length; f++) {
			for(let c=cols; c>col; c--) {
				this.facts[f].props[c] = this.facts[f].props[c-1];
			}
			this.facts[f].props[col] = "New Column";
		}
	}
	
	removeCol(col: number): void {
		this.columns.splice(col, 1);
		for(let f=0; f< this.facts.length; f++) {
			this.facts[f].props.splice(col, 1);
		}
	}
}
