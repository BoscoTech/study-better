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
import { BookEditorComponent } from './editors/book-editor/book-editor.component';
import { HideBoxComponent } from './editors/useful/hide-box.component';
import { ButtonBoxComponent } from './editors/useful/button-box.component';
import { ListItemComponent } from './editors/useful/list-item.component';
import { ExpandingTextAreaComponent } from './editors/useful/expanding-text-area.component';
import { NomQuizComponent } from './nom-quiz/nom-quiz.component';
import { FormattedDisplayComponent } from './format/formatted-display.component';

@NgModule
({
	declarations: 
	[
		AppComponent,
		JaxComponent,
		FormattedInputComponent,
		EditorComponent,
		FactSetEditorComponent,
		BookEditorComponent,
		HideBoxComponent,
		ButtonBoxComponent,
		ListItemComponent,
		ExpandingTextAreaComponent,
		NomQuizComponent,
		FormattedDisplayComponent
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
