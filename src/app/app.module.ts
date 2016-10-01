import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';


import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {TeamScoreComponent} from "./teamScore/teamScore.component";

export const firebaseConfig = {
  apiKey: "AIzaSyBywWbN07uMZmntKrQwvtKFEpMMmdr6jqg",
  authDomain: "blindtest-997e7.firebaseapp.com",
  databaseURL: "https://blindtest-997e7.firebaseio.com",
  storageBucket: "blindtest-997e7.appspot.com"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AppComponent,
    TeamScoreComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
   /* AngularFireModule.initializeApp(firebaseConfig),*/
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
