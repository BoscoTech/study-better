import { Component, OnInit } from '@angular/core';
import { Formats } from 'app/format/formats';

let amounts = [ 
	"Mono",
	"Di",
	"Tri",
	"Tetra",
	"Penta",
	"Hexa",
	"Hepta",
	"Octa",
	"Nona",
	"Deca"
];

let elements = [
	["Boron", "boride", "B"],
	["Carbon", "carbide", "C"],
	["Nitrogen", "nitride", "N"],
	["Oxygen", "oxide", "O"],
	["Fluorine", "fluoride", "F"],
	["Silicon", "silicide", "Si"],
	["Phosphorus", "phosphide", "P"],
	["Sulfur", "sulfide", "S"],
	["Chlorine", "chloride", "Cl"],
	["Arsenic", "arsenide", "As"],
	["Selenium", "selenide", "Se"],
	["Bromine", "bromide", "Br"],
	["Iodine", "iodide", "I"],
];

//Positively charged
let polyatomicCations = [
	["NH4+", 1, "Ammonium"]
];

let constantCations = [ 
	["Li+", 1, "Lithium"],
	["Be 2+", 2, "Beryllium"],
	["Na+", 1, "Sodium"],
	["Mg 2+", 2, "Magnesium"],
	["K+", 1, "Potassium"],
	["Ca 2+", 2, "Calcium"],
	["Ag+", 1, "Silver"],
	["Al 3+", 3, "Aluminum"],
	["Cd 2+", 2, "Cadmium"],
	["Zn 2+", 2, "Zinc"]
];

let variableCations = [
	["Ti+", 1, "Titanium (I)"],
	["Ti 2+", 2, "Titanium (II)"],
	["Ti 3+", 3, "Titanium (III)"],
	["Cr+", 1, "Chromium (I)"],
	["Cr 2+", 2, "Chromium (II)"],
	["Cr 3+", 3, "Chromium (III)"],
	["Mn+", 1, "Manganese (I)"],
	["Mn 2+", 2, "Manganese (II)"],
	["Mn 3+", 3, "Manganese (III)"],
	["Fe+", 1, "Iron (I)"],
	["Fe 2+", 2, "Iron (II)"],
	["Fe 3+", 3, "Iron (III)"],
	["Co+", 1, "Cobalt (I)"],
	["Co 2+", 2, "Cobalt (II)"],
	["Co 3+", 3, "Cobalt (III)"],
	["Cu+", 1, "Copper (I)"],
	["Cu 2+", 2, "Copper (II)"],
	["Cu 3+", 3, "Copper (III)"],
	["Zn+", 1, "Zinc (I)"],
	["Zn 2+", 2, "Zinc (II)"],
	["Zn 3+", 3, "Zinc (III)"],
	["Sn+", 1, "Tin (I)"],
	["Sn 2+", 2, "Tin (II)"],
	["Sn 3+", 3, "Tin (III)"],
	["Os+", 1, "Osmium (I)"],
	["Os 2+", 2, "Osmium (II)"],
	["Os 3+", 3, "Osmium (III)"],
	["Ir+", 1, "Iridium (I)"],
	["Ir 2+", 2, "Iridium (II)"],
	["Ir 3+", 3, "Iridium (III)"]
];

//Negatively charged.
let polyatomicAnions = [
	["H2PO4-", -1, "Dihydrogen phosphate"],
	["C2H3O2-", -1, "Acetate"],
	["HSO3-", -1, "Hydrogen sulfite or Bisulfite"],
	["HSO4-", -1, "Hydrogen sulfate or Bisulfate"],
	["HCO3-", -1, "Hydrogen carbonate or Bicarbonate"],
	["NO2-", -1, "Nitrite"],
	["NO3-", -1, "Nitrate"],
	["CN-", -1, "Cyanide"],
	["OH-", -1, "Hydroxide"],
	["MnO4-", -1, "Permanganate"],
	["ClO-", -1, "Hypochlorite"],
	["ClO2-", -1, "Chlorite"],
	["ClO3-", -1, "Chlorate"],
	["ClO4-", -1, "Perchlorate"],
	["BrO3-", -1, "Bromate"],
	["IO3-", -1, "Iodate"],
	["HPO4 2-", -2, "Hydrogen phosphate or Biphosphate"],
	["C2O4 2-", -2, "Oxalate"],
	["SO3 2-", -2, "Sulfite"],
	["SO4 2-", -2, "Sulfate"],
	["S2O3 2-", -2, "Thiosulfate"],
	["CO3 2-", -2, "Carbonate"],
	["CrO4 2-", -2, "Chromate"],
	["Cr2O7 2-", -2, "Dichromate"],
	["SiO3 2-", -2, "Silicate"],
	["O2 2-", -2, "Peroxide"],
	["PO3 3-", -3, "Phosphite"],
	["PO4 3-", -3, "Phosphate"],
	["AsO4 3-", -3, "Arsenate"]
];

let constantAnions = [
	["O 2-", -2, "Oxide"],
	["F-", -1, "Fluoride"],
	["S 2-", -2, "Sulfide"],
	["Cl-", -1, "Chloride"],
	["Br-", -1, "Bromide"],
	["I-", -1, "Iodide"]
];

namespace generators {
	let numElements = elements.length;
	function phoneticJoin(a: string, b: string): string {
		if(a[a.length - 1].toLowerCase() == b[0].toLowerCase()) {
			return a.slice(0, -1) + b;
		} else {
			return a + b;
		}
	}
	function randInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
	function randRangeInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function weightedRandInt(max: number): number {
		return Math.floor(Math.pow(Math.random(), 2.0) * max);
	}
	function weightedRandRangeInt(min: number, max: number): number {
		return Math.floor(Math.pow(Math.random(), 2.0) * (max - min)) + min;
	}
	function basicAnswerChecker(userAnswer: string, expectedAnswer: string): boolean {
		console.log("Using basic answer checker!");
		return userAnswer.trim().toLowerCase() == expectedAnswer.trim().toLowerCase();
	}
	function findCharge(formula: string): number {
		let char = "";
		let pos = -1;
		let charge = 0;
		if(formula.indexOf("-") != -1) {
			char = "-";
			pos = formula.indexOf("-")
		} else {
			char = "+";
			pos = formula.indexOf("+");
			if(pos == -1) return 0; //There are no charge symbols, charge is 0.
		}
		if("0123456789".search(formula[pos-1]) != -1) { //The numbers are before the sign.
			let mult = (char == "+") ? 1 : -1;
			let start = formula.lastIndexOf(" ", pos);
			let charge = parseInt(formula.slice(start, pos)) * mult;
			return ((isNaN(charge)) ? 0 : charge);
		} else { //The numbers are after the sign.
			let charge = parseInt(formula.slice(pos, formula.length));
			return ((isNaN(charge)) ? 0 : charge);
		}
	}
	function stripCharge(formula: string): string {
		return formula.replace(/([\-\+][0-9]*)|( [0-9]*[\-\+])/, "");
	}
	window['stripCharge'] = stripCharge;
	function formulaChecker(userAnswer: string, expectedAnswer: string): boolean {
		let expectedCharge = findCharge(expectedAnswer);
		let userCharge = findCharge(userAnswer);
		if(expectedCharge != userCharge) return false;
		userAnswer = stripCharge(userAnswer);
		expectedAnswer = stripCharge(expectedAnswer); //Delete the charge.
		userAnswer = userAnswer.replace(" ", ""); //Remove spaces, now that the charge is gone.
		expectedAnswer = expectedAnswer.replace(" ", "");
		return expectedAnswer == userAnswer;
	}
	function multiAnswerChecker(userAnswer: string, expectedAnswer: string): boolean {
		console.log("Using multi answer checker!");
		let correct = false;
		let expectedAnswers = expectedAnswer.split(" or ");
		for(let answer of expectedAnswers) {
			correct = correct || basicAnswerChecker(userAnswer, answer);
		}
		return correct;
	}
	type questionArray = [string, string, string, string, string, string, (u: string, e: string) => boolean, (u: string, e: string) => boolean];
	export function basicNeutralMolecule(): questionArray {
		let name = "";
		let formula = "";
		let nameDesc = "";
		let formulaDesc = "";
		let firstIndex = weightedRandInt(20);
		let secondIndex = weightedRandRangeInt(firstIndex + 1, numElements);
		while(elements[secondIndex][1] == null) {
			secondIndex = weightedRandRangeInt(firstIndex + 1, numElements);
		}
		let firstAmount = weightedRandInt(10) + 1;
		let secondAmount = weightedRandInt(10) + 1;
		nameDesc += "This compound is not ionic. ";
		formula += elements[firstIndex][2];
		if(firstAmount == 1) {
			nameDesc += "Since there is only one of the first element, there is no prefix. ";
			formulaDesc += "Since the first element has no prefix, there is only one of the first element. ";
			name += elements[firstIndex][0];
		} else {
			nameDesc += "Since there is " + firstAmount.toString() + 
				" of the first element, the prefix " + amounts[firstAmount - 1] + " is used. ";
			formulaDesc += "The first element uses the prefix " + amounts[firstAmount - 1] + 
				", showing that there is " + firstAmount.toString() + " of the first element. ";
			name += phoneticJoin(amounts[firstAmount - 1], elements[firstIndex][0].toLowerCase());
			formula += firstAmount.toString();
		}
		nameDesc += "The symbol " + elements[firstIndex][2] + " symbolizes the first element, " + 
			elements[firstIndex][0] + ". ";
		formulaDesc += "The symbol " + elements[firstIndex][2] + " is used to symbolize the first element, " + 
			elements[firstIndex][0] + ". ";
		formula += elements[secondIndex][2];
		if(secondAmount != 1) {
			formula += secondAmount.toString();
		}
		nameDesc += "Since there is " + secondAmount.toString() + " of the second element, the prefix " +
			amounts[secondAmount - 1].toLowerCase() + " is used. ";
		formulaDesc += "The second element uses the prefix " + amounts[secondAmount - 1] + ", showing that there is " +
			secondAmount.toString() + " of the second element. ";
		nameDesc += "The second element is " + elements[secondIndex][0] + ", but its name must be changed to " + 
			elements[secondIndex][1] + ". ";
		formulaDesc += "The second element is called " + elements[secondIndex][0] + ", and its symbol is " +
			elements[secondIndex][2] + ". ";
		name += " " + phoneticJoin(amounts[secondAmount - 1].toLowerCase(), elements[secondIndex][1].toLowerCase());
		return ["Name this compound:", "Write the formula for this compound:", 
		        formula, name, nameDesc, formulaDesc, basicAnswerChecker, basicAnswerChecker];
	}
	export function singlePolyatomicIon(): questionArray {
		let name = "";
		let formula = "";
		let nameDesc = "";
		let formulaDesc = "";
		let index = randInt(polyatomicAnions.length + polyatomicCations.length);
		let ion: (string|number)[];
		if(index >= polyatomicAnions.length) {
			index -= polyatomicAnions.length;
			ion = polyatomicCations[index];
		} else {
			ion = polyatomicAnions[index];
		}
		name = ion[2] as string;
		formula = ion[0] as string;
		nameDesc = "This ion is called " + name + ".";
		formulaDesc = "The formula for this ion is " + formula + ".";
		return ["Name this polyatomic ion:", "Write the formula (including charge!) for this polyatomic ion:", 
		        formula, name, nameDesc, formulaDesc, multiAnswerChecker, formulaChecker];
	}
	export function ionicCompound(): questionArray {
		let name = "";
		let formula = "";
		let nameDesc = "This is an ionic compound. ";
		let formulaDesc = "This is an ionic compound. ";
		let cationSource = randInt(7);
		let cationIsPolyatomic = false;
		let cation: (string|number)[];
		if(cationSource < 1) { //Polyatomic cations.
			cation = polyatomicCations[randInt(polyatomicCations.length)];
			cationIsPolyatomic = true;
		} else if(cationSource < 4) { //Constant cations.
			cation = constantCations[randInt(constantCations.length)];
		}
		else if(cationSource < 7) { //Variable cations.
			cation = variableCations[randInt(variableCations.length)];
		}
		let anionSource = randInt(4);
		let anionIsPolyatomic = false;
		let anion: (string|number)[];
		if(anionSource < 3) { //Polyatomic anions.
			anion = polyatomicAnions[randInt(polyatomicAnions.length)];
			anionIsPolyatomic = true;
		}
		else if(anionSource < 4) { //Constant anions.
			anion = constantAnions[randInt(constantAnions.length)];
		}
		let numAnions = cation[1] as number; //The charge
		let numCations = -(anion[1] as number);
		//Remove common factors.
		if((numAnions % 2 == 0) && (numCations % 2 == 0)) {
			numAnions /= 2;
			numCations /= 2;
		}
		if((numAnions % 3 == 0) && (numCations % 3 == 0)) {
			numAnions /= 3;
			numCations /= 3;
		}
		if((numAnions % 2 == 0) && (numCations % 2 == 0)) { //4
			numAnions /= 2;
			numCations /= 2;
		}
		if((numAnions % 5 == 0) && (numCations % 5 == 0)) {
			numAnions /= 5;
			numCations /= 5;
		}
		if(numCations == 1) {
			formula += stripCharge(cation[0] as string).trim();
		} else if(cationIsPolyatomic) {
			formula += "(" + stripCharge(cation[0] as string).trim() + ")" + numCations.toString();
		} else {
			formula += stripCharge(cation[0] as string).trim() + numCations.toString();
		}
		if(numAnions == 1) {
			formula += stripCharge(anion[0] as string).trim();
		} else if(anionIsPolyatomic) {
			formula += "(" + stripCharge(anion[0] as string).trim() + ")" + numAnions.toString();
		} else {
			formula += stripCharge(anion[0] as string).trim() + numAnions.toString();
		}
		let anionChoices = (anion[2] as string).split(" or ");
		name = cation[2] + " " + anionChoices[0].toLowerCase();
		if(anionChoices.length > 1) {
			name += " or " + cation[2] + " " + anionChoices[1].toLowerCase();
		}
		if((cation[2] as string).indexOf("(") != -1) { //If it has parenthesis.
			nameDesc += "The cation in the formula is " + stripCharge(cation[0] as string) + ", which is the symbol for the element "
			nameDesc += (cation[2] as string).replace(/ \(I+\)/, "") + ". ";
		} else {
			nameDesc += "The cation in the formula is " + stripCharge(cation[0] as string) + ", which is the formula for the " + cation[2] + " ion. "
		}
		nameDesc += "The anion in the formula is " + stripCharge(anion[0] as string) + ", which is the formula for the " + anion[2] + " ion. ";
		if((cation[2] as string).indexOf("(") != -1) { //If the cation had parenthesis.
			nameDesc += "Its charge is " + (anion[1] as number).toString() + ". ";
			nameDesc += "Because there are " + numAnions.toString() + " of these and " + numCations.toString() + " of the cation, the charge ";
			nameDesc += "of the cation must be +" + (cation[1] as number).toString() + ". ";
			nameDesc += "Since " + (cation[2] as string).replace(/ \(I+\)/, "") + " has no definite charge, "
			nameDesc += (cation[2] as string).replace(/.*(?=\()/, "") + " must be added. ";
		}
		formulaDesc += "The cation is " + (cation[2] as string).replace(/ \(I+\)/, "") + ". ";
		if((cation[2] as string).indexOf("(") != -1) { //If it has parenthesis.
			formulaDesc += "Its formula is " + stripCharge(cation[0] as string) + ", and the " + (cation[2] as string).replace(/.*(?=\()/, "")
			formulaDesc += " shows that its charge must be +" + (cation[1] as number).toString() + ". ";
		} else {
			formulaDesc += "Its formula is " + stripCharge(cation[0] as string) + ", and its charge is +" + (cation[1] as number).toString() + ". ";
		}
		formulaDesc += "The anion is " + anion[2] + ". ";
		formulaDesc += "Its formula is " + stripCharge(anion[0] as string) + ", and its charge is " + (anion[1] as number).toString() + ". ";
		formulaDesc += "Using these charges, it is found that the compound contains " + numCations.toString() + " " + cation[2];
		formulaDesc += ((numCations == 1) ? " ion" : " ions") + " for every " + numAnions.toString() + " " + anion[2] + ((numAnions == 1) ? " ion. " : " ions. ");
		if((numCations > 1) && cationIsPolyatomic) {
			formulaDesc += "Since " + cation[2] + " is polyatomic, and there is more than one of it, its formula must be surrounded in parenthesis. "
		}
		if((numAnions > 1) && anionIsPolyatomic) {
			formulaDesc += "Since " + anion[2] + " is polyatomic, and there is more than one of it, its formula must be surrounded in parenthesis. "
		}
		return ["Name this compound:", "Write the formula for this compound:",
		        formula, name, nameDesc, formulaDesc, multiAnswerChecker, formulaChecker];
	}
	export function acid(): questionArray {
		let name = "";
		let formula = "";
		let nameDesc = "This compound is an acid. ";
		let formulaDesc = "";
		let anionSource = randInt(3);
		let anionIsPolyatomic = false;
		let anion: (string|number)[];
		if(anionSource < 2) { //Polyatomic anions.
			anionIsPolyatomic = true;
			anion = polyatomicAnions[randInt(polyatomicAnions.length)];
			while((anion[0] as string).indexOf("H") != -1) {
				anion = polyatomicAnions[randInt(polyatomicAnions.length)];				
			}
			nameDesc += "The anion in the formula is " + stripCharge(anion[0] as string) + ", which is the formula for the " + anion[2] + " ion. ";
			name += anion[2];
			if(name.indexOf("ate") != -1) {
				name = name.replace("ate", "ic");
				nameDesc += "The 'ate' in " + anion[2] + " is changed to ic, creating " + name + ". ";
				formulaDesc += "(The 'ate' had been changed to 'ic'.) ";
			} else if(name.indexOf("ite") != -1) {
				name = name.replace("ite", "ous");
				nameDesc += "The 'ite' in " + anion[2] + " is changed to ous, creating " + name + ". ";
				formulaDesc += "(The 'ite' had been changed to 'ous'.) ";
			} else if(name.indexOf("ide") != -1) {
				name = name.replace("ide", "ous");
				nameDesc += "The 'ide' in " + anion[2] + " is changed to ous, creating " + name + ". ";
				formulaDesc += "(The 'ide' had been changed to 'ous'.) ";
			}
			formulaDesc = "The first part of the name, " + name + ", refers to the " + anion[2] + " ion. " + formulaDesc;
			formulaDesc = "This compound is an acid. " + formulaDesc;
			formulaDesc += "The formula for this ion is " + stripCharge(anion[0] as string) + ". "; 
		}
		else if(anionSource < 4) { //Constant anions.
			anion = constantAnions[randInt(constantAnions.length)];
			while((anion[0] as string).indexOf("O") != -1) {
				anion = constantAnions[randInt(constantAnions.length)];				
			}
			nameDesc += "The anion in the formula is " + stripCharge(anion[0] as string) + ", which is the symbol for the " + anion[2] + " ion. ";
			nameDesc += "Since this is a monoatomic ion, the prefix 'Hydro' is added. "
			nameDesc += "Also, the 'ide' in " + anion[2] + " is changed to ic, creating " + (anion[2] as string).replace("ide", "ic") + ". ";
			name += "Hydro" + (anion[2] as string).toLowerCase();
			name = name.replace("ide", "ic");
			formulaDesc += "The prefix Hydro- shows that this acid's cation is monoatomic. ";
			formulaDesc += "Thus, " + name + " refers to the " + anion[2] + " ion. (The 'ide' was changed to 'ic'.) ";
			formulaDesc += "Its symbol is " + stripCharge(anion[0] as string) + ". ";
		}
		nameDesc += "Finally, 'acid' is added to the end, since it is an acid. ";
		formulaDesc += "Because its charge is " + (anion[1] as number).toString() + ", it will need ";
		let hydrogens = -(anion[1] as number);
		formulaDesc += hydrogens.toString() + " hydrogen " + ((hydrogens == 1) ? "atom" : "atoms") + " to balance its charge. ";
		name += " acid";
		formula += "H";
		if(anion[1] < -1) formula += (-(anion[1] as number)).toString() 
		formula += stripCharge(anion[0] as string);
		return ["Name this compound:", "Write the formula for this compound:", 
		        formula, name, nameDesc, formulaDesc, basicAnswerChecker, formulaChecker];
	}
	export function randomQuestion(): questionArray {
		let questionSource = randInt(5);
		if(questionSource < 1) return basicNeutralMolecule();
		else if(questionSource < 2) return singlePolyatomicIon();
		else if(questionSource < 4) return ionicCompound();
		else if(questionSource < 5) return acid();
	}
}

@Component({
  selector: 'nom-quiz',
  templateUrl: './nom-quiz.component.html',
  styleUrls: ['./nom-quiz.component.css']
})
export class NomQuizComponent {
	private question: string = "Click the button to start the quiz!";
	private qcard: string = "Questions will show up here";
	private formatQcard: boolean = false;
	private answer: string = "You can write your answers here";
	private expectedAnswer: string = "";
	private answerChecker: (u: string, e: string) => boolean = (u, e) => false;
	private answerCorrect = false;
	private showFeedback = true;
	private formatAnswer: boolean = false;
	private problems: string = "";
	private correct: string = "";

	get formatter() {
		return Formats.chemical;
	}
	
	get answerFormatter() {
		if(this.formatAnswer) {
			return Formats.chemical;
		} else {
			return Formats.plainText;
		}
	}
	
	onNextQuestion() {
		this.showFeedback = false;
		this.answer = " ";
		let question = generators.randomQuestion();
		let qtype: boolean = Math.random() < 0.5;
		if(qtype) {
			this.question = question[1];
			this.qcard = question[3];
			this.expectedAnswer = question[2];
			this.problems = question[5];
			this.answerChecker = question[7];
		} else {
			this.question = question[0];
			this.qcard = question[2];
			this.expectedAnswer = question[3];	
			this.problems = question[4];
			this.answerChecker = question[6];
		}
		this.problems += "Therefore, " + this.expectedAnswer + " is the correct answer.";
		this.formatQcard = !qtype;
		this.formatAnswer = qtype;
	}
	
	onSubmitAnswer() {
		if(this.showFeedback) return;
		this.answerCorrect = this.answerChecker(this.answer, this.expectedAnswer);
		this.showFeedback = true;
	}
}
