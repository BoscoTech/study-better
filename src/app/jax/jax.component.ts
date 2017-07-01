import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'jax',
	templateUrl: './jax.component.html',
	styleUrls: ['./jax.component.css']
})
export class JaxComponent {
	@Input('Tex') texCode: string;
	@ViewChild("display") texDisplay: ElementRef;
	
	constructor(private element: ElementRef) { }

	ngOnChanges() {
		this.texDisplay.nativeElement.innerHTML = this.texCode;
		if(("useMathjax" in window) && (window["useMathjax"])) {
			window["MathJax"].Hub.Queue(["Typeset", window["MathJax"].Hub, this.texDisplay.nativeElement]);
			console.log(window["MathJax"].Hub.queue);
		}
	}
}
