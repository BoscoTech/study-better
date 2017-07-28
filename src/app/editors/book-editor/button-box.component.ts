import { Component, Input } from '@angular/core';

export enum ButtonState {
	DISABLED = 0,
	PLAIN = 1,
	ROTATED = 3
}

@Component({
  selector: 'button-box',
  templateUrl: './button-box.component.html',
  styleUrls: ['./button-box.component.css']
})
export class ButtonBoxComponent {
	readonly bclasses = [['p', 'add'], ['x', 'cancel'], ['v', 'down_min']];
	@Input('buttons') buttons: any;
	@Input('button-class') buttonClass: string;
	
	get ButtonState() {
		return ButtonState;
	}
	
	ngOnInit() {
		window.console.log(this.buttons);
	}
	
	ngAfterContentChecked() {
		for(let i in this.buttons) {
			if(!this.buttons[i].state) {
				this.buttons[i].state = ButtonState.PLAIN;
			}
		}
	}
}
