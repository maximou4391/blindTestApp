import {Component} from '@angular/core';

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireAuth} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  teams: FirebaseListObservable<any[]>;

  songs: FirebaseListObservable<any[]>;

  maximumPoints: number = 50;

  scoreHeight: number = 20;

  newTeamName: string;

  newSongArtist: string;

  newSongTitle: string;

  auth: AngularFireAuth;

  playedSong: FirebaseObjectObservable<any[]>;

  email: string;

  password: string;

  constructor(public af: AngularFire, _auth: AngularFireAuth) {
    this.teams = af.database.list('/teams');

    this.songs = af.database.list('/songs');

    this.playedSong = af.database.object('/playedSong');

    console.log('playedSong', this.playedSong );

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

  addSong() {
    this.songs.push({artist: this.newSongArtist, title: this.newSongTitle});
  }

  removeSong(key: string) {
    this.teams.remove(key);
  }

  showPlayedSong(songTitle: string) {
    this.playedSong.set({ title: songTitle});
  }


}
