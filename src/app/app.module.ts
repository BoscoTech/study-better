import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GapiService } from './gwrap/gapi.service';
import { DriveService } from './gwrap/drive.service';
import { RealtimeService } from './gwrap/realtime.service';
import { JaxComponent } from './jax/jax.component';
import { FormattedInputComponent } from './format/formatted-input.component';
import { EditorComponent } from './editors/editor.component';
import { FactSetEditorComponent } from './editors/fact-set/fact-set-editor.component';
import { InjectorRef } from "app/injector-ref";
import { PickerService } from "app/gwrap/picker.service";

@NgModule
({
	declarations: 
	[
		AppComponent,
		JaxComponent,
		FormattedInputComponent,
		EditorComponent,
		FactSetEditorComponent
	],
	imports: 
	[
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [GapiService, DriveService, RealtimeService, PickerService],
	bootstrap: [AppComponent]
})
export class AppModule { 
	constructor(private injector: Injector) {
		InjectorRef.injector = this.injector;
	}
}
