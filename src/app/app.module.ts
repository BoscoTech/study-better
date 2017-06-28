import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FactDispComponent } from './fact/fact-disp/fact-disp.component';
import { FactSetDispComponent } from './fact/fact-set-disp/fact-set-disp.component';

@NgModule
({
  declarations: 
  [
    AppComponent,
    FactDispComponent,
    FactSetDispComponent
  ],
  imports: 
  [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
