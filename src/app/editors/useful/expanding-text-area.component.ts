import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: 'expanding-text-area',
  templateUrl: './expanding-text-area.component.html',
  styleUrls: ['./expanding-text-area.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: ExpandingTextAreaComponent, multi: true}]
})
export class ExpandingTextAreaComponent implements OnInit, ControlValueAccessor {
	_changeFunc: (_: any) => { };
	_touchFunc: () => { };
	_content: string = "";
	set content(value: string) {
		this._content = value;
		this._changeFunc(value);
		this.resize();
	}
	
	get content(): string {
		return this._content;
	}
	@Input('placeholder') placeholder: string = "";
	@ViewChild('area') textArea: ElementRef;
	
	_resize() {
		let ne = this.textArea.nativeElement;
		ne.style.height = "auto";
		ne.style.height = ne.scrollHeight + "px";
	}
	
	resize() {
		window.setTimeout(() => this._resize(), 0);
	}
	
	ngOnInit() {
		this.resize();
		this.textArea.nativeElement.addEventListener("input", () => this.resize());
	}
	
	writeValue(value: any): void {
		if(typeof(value)==="string") {
			this._content = value;
			this.resize();
		}
	}
	
	registerOnChange(func: any): void {
		if(typeof(func)==="function") {
			this._changeFunc = func;
		}
	}
	
	registerOnTouched(func: any): void {
		if(typeof(func)==="function") {
			this._touchFunc = func;
		}
	}
	
	setDisabledState(isDisabled: boolean): void {
		
	}
}
