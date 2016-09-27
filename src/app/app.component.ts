import {Component} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  teams: FirebaseListObservable<any[]>;

  maximumPoints: number = 50;

  scoreHeight: number = 40;

  newTeamName: string;

  constructor(af: AngularFire) {
    this.teams = af.database.list('/items');
    console.log('teams', this.teams);
  }

  ngOnInit() {
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
}
