import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albumSongs:any;
  discTracks:any;
  prevArtistData:any;
  prevResults:any;
  prevSearchString:any;

  constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute) { 
    //sets the subject to true (the user is watching artist/album/songs)
    this._spotifyService.subject.next(true);
  }

  ngOnInit() {
    //request data from API
    this._route.params.pipe(map(params => params['id'])).subscribe((id => {
      this._spotifyService.getOneAlbum(id).subscribe(res=> {
        this.albumSongs = res; 
        const discQuantity = res.tracks.items[res.tracks.items.length-1].disc_number; 
        //gets last item disc number
        const tracks = res.tracks.items; 
        //gets tracks as array
        const discFormattedTracks = [] 
        //creates empty array to fill with tracks
          for (let i = 0; i <= discQuantity; i++) {
            discFormattedTracks[i] = tracks.filter(track => track.disc_number === i); 
            //filters tracks and fills array with them
          }
        this.discTracks = discFormattedTracks.slice(1); 
        //deletes [0] row, because its empty due JSON incompatible response (it doesnt start at 0)
      })


      

    }));

    //subscribes to previous results coming from artist and menu to be used in the navigation.
    this._spotifyService.prevData.subscribe(artistData => this.prevArtistData = artistData);
    this._spotifyService.prevResults.subscribe(prevResults => this.prevResults = prevResults);
    this._spotifyService.prevSearchString.subscribe(prevSearchString => this.prevSearchString = prevSearchString);
   
    if(!this.prevArtistData.getOwnPropertyNames){
      this.prevArtistData = JSON.parse(localStorage.getItem('last-artist'));
    }
    if(!this.prevResults.getOwnPropertyNames){
      this.prevResults = JSON.parse(localStorage.getItem('last-result'));
    }
    if(!this.prevSearchString){
      this.prevSearchString = localStorage.getItem('last-query');
    }
  }

  remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  } 

  addToFavorites(data) {
    let memoryFavSongs = JSON.parse(localStorage.getItem('favorite-songs'));
    
    if(!memoryFavSongs) {
      localStorage.setItem('favorite-songs', "[]");
      memoryFavSongs = JSON.parse(localStorage.getItem('favorite-songs'));
    }

    const favSongsArchetipe = {
      artistName: data.artists[0].name,
      songName: data.name,
      albumName: this.albumSongs.name,
      albumImage: this.albumSongs.images[0].url,
      songId: data.id,
    };
    
    if(!memoryFavSongs.find(element => element.songId === favSongsArchetipe.songId)){
      memoryFavSongs.push(favSongsArchetipe);
    }else{
      let index = memoryFavSongs.findIndex(element => element.songId === favSongsArchetipe.songId);
      memoryFavSongs.splice(index, 1);
    }
    localStorage.setItem('favorite-songs', JSON.stringify(memoryFavSongs));
  }


}
