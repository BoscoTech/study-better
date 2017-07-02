import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JaxComponent } from '../jax/jax.component';

@Component({
	selector: 'formatted-input',
	templateUrl: './formatted-input.component.html',
	styleUrls: ['./formatted-input.component.css'],
	providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormattedInputComponent), multi: true}]
})
export class FormattedInputComponent implements OnInit, ControlValueAccessor {
	editing = false;
	focusInput = false;
	unformattedContent = "\\sqrt{x}";
	formattedContent = "\\(\\sqrt{x}\\)";
	changeFunc: (_: any) => { };
	@Input("formatter") formatter = (input: string) => { return input };
	@ViewChild("in") input: ElementRef;
	
	constructor() { }
	ngOnInit() { }
	
	formatContent(): void {
		this.formattedContent = this.formatter(this.unformattedContent);
	}
	
	writeValue(value: any): void {
		this.unformattedContent = value;
		if(!this.editing) {
			this.formatContent();
		}
	}
	
	registerOnChange(changeFunc: any): void {
		this.changeFunc = changeFunc;
	}
	
	registerOnTouched(): void { }
	
	beginEdit(): void {
		if(this.editing) return;
		this.editing = true;
		this.focusInput = true;
	}
	
	ngAfterViewChecked(): void {
		if(! this.focusInput) return;
		if(! this.input) return;
		this.input.nativeElement.focus();
		setTimeout(() => this.input.nativeElement.select(), 20);
		this.focusInput = false;
	}
	
	endEdit(): void {
		if(!this.editing) return;
		this.formatContent();
		this.editing = false;
	}
	
	doFormChange(): void {
		this.changeFunc(this.unformattedContent);
	}
}
