import { Component, ElementRef, Input, Renderer, ViewChild } from '@angular/core';
import { ButtonState } from './button-box.component';

@Component({
  selector: 'hide-box',
  templateUrl: './hide-box.component.html',
  styleUrls: ['./hide-box.component.css']
})
export class HideBoxComponent {
	expanded = false;
	animating = false;
	buttons: any = {v: {state: ButtonState.PLAIN, click: (b: any) => this.toggleExpanded()}};
	@Input('title') title: string = "";
	@Input('extra-buttons') extraButtons: any = {};
	@ViewChild("root") root: ElementRef;
	
	constructor(private renderer: Renderer) {
	}
	
	toggleExpanded(): void {
		if(this.expanded) {
			this.contract();
		} else {
			this.expand();
		}
	}
	
	expand(): void {
		this.animating = true;
		let native = this.root.nativeElement;
		let comps = window.getComputedStyle(native);
		window['STYLE'] = native.style;
		window["NATIVE"] = native;
		let height = native.scrollHeight;
		height -= parseFloat(comps.paddingTop) + parseFloat(comps.paddingBottom);
		native.style.height = height.toString() + "px";
		setTimeout(() => {
			let remove = this.renderer.listen(native, 'transitionend', (e: any) => {
				if(e.target == native) { //Because otherwise it will be called on the arrow finishing spinning around.
					remove();
					native.style.height = "initial";
					this.animating = false;
				}
			})
		}, 50); //Because otherwise, the event gets called before the transition finishes (???)
		this.expanded = true;
		this.buttons.v.state = ButtonState.ROTATED;
	}
	
	contract(): void {
		if(this.animating) return;
		this.animating = true;
		let native = this.root.nativeElement;
		let comps = window.getComputedStyle(native);
		let height = native.scrollHeight;
		height -= parseFloat(comps.paddingTop) + parseFloat(comps.paddingBottom);
		let transition = native.style.transition;
		native.style.transition = "";
		window.requestAnimationFrame(() => { //Do this after the transition has been unset, these are behind-the-scenes changes.
			native.style.height = height + "px";
			native.style.transition = transition;
			window.requestAnimationFrame(() => {
				native.style.height = "1em";
				setTimeout(() => {
					let remove = this.renderer.listen(native, 'transitionend', (e: any) => {
						remove();
						this.animating = false;
					})
				}, 200); //Because otherwise, the event gets called before the transition finishes (???)
			});
		})
		this.expanded = false;
		this.buttons.v.state = ButtonState.PLAIN;
	}
	
	ngAfterContentChecked(): void {
		for(let key in this.extraButtons) {
			this.buttons[key] = this.extraButtons[key];
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
