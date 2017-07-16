import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FactSetDispComponent } from './fact/fact-set-disp/fact-set-disp.component';
import { FactSetService } from './fact/fact-set.service';
import { GapiService } from './gwrap/gapi.service';
import { DriveService } from './gwrap/drive.service';
import { RealtimeService } from './gwrap/realtime.service';
import { JaxComponent } from './jax/jax.component';
import { FormattedInputComponent } from './format/formatted-input.component';
import { EditorComponent } from './editors/editor.component';

@NgModule
({
	declarations: 
	[
		AppComponent,
		FactSetDispComponent,
		JaxComponent,
		FormattedInputComponent,
		EditorComponent
	],
	imports: 
	[
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [FactSetService, GapiService, DriveService, RealtimeService],
	bootstrap: [AppComponent]
})
export class AppModule { }
