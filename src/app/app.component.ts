import {Component} from '@angular/core';
declare var $: any;

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireAuth} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  teams: FirebaseListObservable<any[]>;

  songs: FirebaseListObservable<any[]>;

  maximumPoints: number = 20;

  scoreHeight: number = 30;

  newTeamName: string;

  newSongTitle: string;

  playedSong: FirebaseObjectObservable<any[]>;

  email: string;

  password: string;

  songList: string;

  constructor(public af: AngularFire) {
    this.teams = af.database.list('/teams');

    this.songs = af.database.list('/songs');

    this.playedSong = af.database.object('/playedSong');
  }

  ngOnInit() {
    // Initialize played song
    this.playedSong.set({ title: "Let's start!"});
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
    location.reload();
  }

  logout() {
    this.af.auth.logout();
    location.reload();
  }

  addSong() {
    this.songs.push({title: this.newSongTitle});
  }

  removeSong(key: string) {
    this.teams.remove(key);
  }

  showPlayedSong(songTitle: string) {
    this.playedSong.set({ title: songTitle});
    $('#played-song-modal').modal('show');
  }


  // take path in folder
  // open browser access path
  // ctrl A
  // copy into excel
  // remove everything except the title and add column name "title"
  // copy to http://shancarter.github.io/mr-data-converter/
  // paste
  populateSongs(songsList: string): void {
    console.log('song list',JSON.parse(songsList));
    let songsListArray: Array<any> = JSON.parse(songsList);


    for (let song of songsListArray) {

      let titleCleanedUp: string = song.title;
      titleCleanedUp = titleCleanedUp.replace('.mp3', '');
      titleCleanedUp = titleCleanedUp.replace('[pleer.net]', '');

      this.songs.push({title: titleCleanedUp});
    }
  }

  clearSongs() {
    let answer = confirm("Clear all songs?");
    if (answer == true) {
      this.songs.remove();
    }
  }


}
