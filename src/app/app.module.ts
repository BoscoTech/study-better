import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FactSetDispComponent } from './fact/fact-set-disp/fact-set-disp.component';

@NgModule
({
  declarations: 
  [
    AppComponent,
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
