import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-disc',
  templateUrl: './disc.component.html',
  styleUrls: ['./disc.component.css']
})
export class DiscComponent implements OnInit {
  @Output() addedToFavorites: EventEmitter<any> = new EventEmitter<any>();
  @Input() tracks:any;
  memoryFavSongs:any;
  discnumber:any;

  constructor() { }

  ngOnInit() {
    //when tracks (album's songs arrive, grabs the disc number from the first of them)
    if(this.tracks) {
      this.discnumber = this.tracks[0];
    }

    //favorite songs snippet starts here-
      this.memoryFavSongs = JSON.parse(localStorage.getItem('favorite-songs'));
      if(!this.memoryFavSongs) {
        localStorage.setItem('favorite-songs', "[]");
        this.memoryFavSongs = JSON.parse(localStorage.getItem('favorite-songs'));
      }
    
    this.tracks.map(e => {
      if(this.memoryFavSongs.find(favorited => favorited.songId === e.id)) {
        e.favorited = true;
      }else{
        e.favorited = false;
      };
    });
  }

  addToFavoritesMethod(data){
    //gets track info.favorited
    if(data.favorited) {
      //if its favorited, set it to false
      this.tracks[data.track_number-1].favorited = false;
    }else{
       //if its not favorited, set it to true
      this.tracks[data.track_number-1].favorited = true;
    }
    //adds it to localstorage
    this.addedToFavorites.emit(data);
  }
}
