import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JaxComponent } from '../jax/jax.component';

@Component({
	selector: 'formatted-display',
	templateUrl: './formatted-display.component.html',
	styleUrls: ['./formatted-display.component.css'],
	providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormattedDisplayComponent), multi: true}]
})
export class FormattedDisplayComponent implements OnInit, ControlValueAccessor {
	unformattedContent = "\\sqrt{x}";
	formattedContent = "\\(\\sqrt{x}\\)";
	changeFunc: (_: any) => { };
	@Input("formatter") formatter = (input: string) => { return input };
	@ViewChild("in") input: ElementRef;
	
	constructor() { }
	ngOnInit() { }
	
	formatContent(): void {
		if(this.unformattedContent) {
			this.formattedContent = this.formatter(this.unformattedContent);
		}
	}
	
	writeValue(value: any): void {
		this.unformattedContent = value;
		this.formatContent();
	}
	
	registerOnChange(changeFunc: any): void {
		this.changeFunc = changeFunc;
	}
	
	registerOnTouched(): void { }
	
	ngOnChanges(): void {
		this.formatContent();
	}
	
	ngAfterViewChecked(): void {
		if(! this.input) return;
		this.input.nativeElement.focus();
		setTimeout(() => this.input.nativeElement.select(), 20);
	}
	
	doFormChange(): void {
		this.changeFunc(this.unformattedContent);
	}
}
