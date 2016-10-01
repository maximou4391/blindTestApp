import {Component} from '@angular/core';

import {AngularFire, FirebaseListObservable, AngularFireAuth} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  teams: FirebaseListObservable<any[]>;

  maximumPoints: number = 50;

  scoreHeight: number = 20;

  newTeamName: string;

  auth: AngularFireAuth;

  email: string;

  password: string;

  constructor(public af: AngularFire, _auth: AngularFireAuth) {
    this.teams = af.database.list('/items');
    console.log('teams', this.teams);

    this.auth = _auth;
  }

  ngOnInit() {
    console.log(this.af.auth);
  }

  addPoint(key: string, score: number) {
    if (score < this.maximumPoints) {
      this.teams.update(key, {score: score + 1});
    }
  }

  removePoint(key: string, score: number) {
    if (score > 0) {
      this.teams.update(key, {score: score - 1});
    }
  }

  addTeam() {
    this.teams.push({name: this.newTeamName, score: 0});
  }

  removeTeam(key: string, teamName: string) {
    let answer = confirm("Remove team: " + teamName + "?");
    if (answer == true) {
      this.teams.remove(key);
    }
  }

  login(){
    this.af.auth.login({ email: this.email,
      password: this.password });
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }


}
