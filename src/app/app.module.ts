import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';


import { AngularFireModule } from 'angularfire2';
import {TeamScoreComponent} from "./teamScore/teamScore.component";

export const firebaseConfig = {
  apiKey: "AIzaSyBywWbN07uMZmntKrQwvtKFEpMMmdr6jqg",
  authDomain: "blindtest-997e7.firebaseapp.com",
  databaseURL: "https://blindtest-997e7.firebaseio.com",
  storageBucket: "blindtest-997e7.appspot.com"
};

@NgModule({
  declarations: [
    AppComponent,
    TeamScoreComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
