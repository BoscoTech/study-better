export namespace Formats {
	export function plain_text(input: string): string {
		return input;
	}
	
	export function mathjax(input: string): string {
		return "\\(" + input + "\\)";
	}
	
	enum ChemType {
		NONE, NAME, NUMBER, PAREN, CHARGE
	}
	
	function chemical_piece(input: string): string {
		let content: Array<Array<any>>;
		content = [[ChemType.NONE, 0, 0]];
		let plevel = 0;
		//Marks sections of content. (E.G. for Cr3O, it would have [NAME, index 0, two characters], [NUMBER, index 2, one character], [NAME, index 3, one character]
		for(let i=0; i< input.length; i++) {
			let char = input[i];
			if(plevel > 0) {
				if(char == ')') {
					plevel --;
				}
				if(plevel == 0) {
					content[content.length-1][3] = chemical_piece(content[content.length-1][3]);
				}
			} else {
				let newMode: ChemType;
				if(char.match(/[a-z]/i)) {
					newMode = ChemType.NAME;
				} else if(char.match(/[0-9]/)) {
					newMode = ChemType.NUMBER;
				} else if(char.match(/(\+|-)/)) {
					newMode = ChemType.CHARGE;
					var chargeIndex = i; //Store this for later, when figuring out if the formula should have a superscript.
				} else if (char == '(') {
					content.push([ChemType.PAREN, i, 1, ""]);
					plevel += 1;
					continue;
				} else {
					newMode = ChemType.NONE;
				}
				
				if(content[content.length-1][0] != newMode) {
					content.push([newMode, i, 0])
				}
			}
			content[content.length-1][2]++;
		}
		
		content.splice(0, 1); //Delete the first one, since it will always be a none type and will sometimes have 0 characters, which could cause problems.
		console.log(content);
		//Handle creation of the superscript.
		if(chargeIndex) {
			//Find the number for the superscript (if it exists)
			if((content[chargeIndex-1][0]==ChemType.NUMBER) && (content[chargeIndex-2][0]==ChemType.NONE)) {
				var numberIndex=chargeIndex-1;
			} else {
				for(let i=chargeIndex; i< content.length; i++) {
					if(content[i][0]==ChemType.NUMBER) {
						var numberIndex=i;
						break;
					}
				}
			}
			
			var superscript="^{";
			//Add the number to the superscript.
			if(numberIndex) {
				let chargeAmount=parseInt(input.substr(content[numberIndex][1], content[numberIndex][2]));
				if(chargeAmount!=1) {
					superscript+=chargeAmount.toString();
				}
			}
			
			//Add the charge to the superscript.
			if(input.substr(content[chargeIndex][1], content[chargeIndex][2]).search(/-/)) {
				superscript+="+";
			} else {
				superscript+="-";
			}
			superscript += "}";
			
			//Delete the original reference to the data for the superscript so that it doesn't get added a second time to the formula.
			if(numberIndex) {
				content.splice(Math.max(chargeIndex, numberIndex), 1);
				content.splice(Math.min(chargeIndex, numberIndex), 1);
			} else {
				content.splice(chargeIndex, 1);
			}
			console.log(superscript);
		}
		
		let tr = "";
		console.log(content);
		let coefficient = true;
		//Add the chemical names and subscripts to the formula.
		for(let i=0; i< content.length; i++) {
			let c = content[i];
			if(c[0] == ChemType.NAME) {
				tr += input.substr(c[1], c[2]);
				coefficient=false;
			} else if(c[0] == ChemType.NUMBER) {
				if(coefficient) {
					tr += input.substr(c[1], c[2]);
				} else {
					tr += "_{" + input.substr(c[1], c[2]) + "}";
				}
			}
		}
		//If it exists, add the superscript to the end of the formula.
		if(superscript) {
			tr += superscript;
		}
		return tr;
	}
	
	export function chemical(input: string): string {
		try {
			return "\\(" + chemical_piece(input) + "\\)";
		} catch(err) {
			return "Syntax Error";
		}
	}
	
	var arrows = ["->", ">", "<-", "<"];
	var larrows = ["\\xrightarrow{}", "\\xrightarrow{}", "\\xleftarrow{}", "\\xleftarrow{}"];
	export function reaction(input: string): string {
		try {
			//Find the arrow, if there is any.
			let arrowIndex = 0;
			while(!input.includes(arrows[arrowIndex]) && (arrowIndex < arrows.length)) {
				arrowIndex++;
			}
			if(arrowIndex == arrows.length) {
				var reactants = input.split(" + ");
			} else {
				let pieces = input.split(arrows[arrowIndex]);
				var reactants = pieces[0].split(" + ");
				var products = pieces[1].split(" + ");
			}
			let reaction = "";
			for(let i=0; i< reactants.length; i++) {
				reaction += chemical_piece(reactants[i]) + " + ";
			}
			reaction = reaction.slice(0, reaction.length-3);
			if(products) {
				reaction += " " + larrows[arrowIndex] + " ";
				for(let i=0; i< products.length; i++) {
					reaction += chemical_piece(products[i]) + " + ";
				}
				reaction = reaction.slice(0, reaction.length-3);
			}
			return "\\(" + reaction + "\\)";
		} catch(err) {
			return "Syntax Error";
		}
	}
}








