import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  private context:string = "album";
  artistAlbums:any;
  artistInfo:any;
  prevResults:any;
  prevSearchString:any;

  
  constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute) {
    //sets the subject to true (the user is watching artist/album/songs)
    this._spotifyService.subject.next(true);
  }

  ngOnInit() {
    //request data from API
    this._route.params.pipe(map(params => params['id'])).subscribe((id => {
      this._spotifyService.getAlbums(id).subscribe( res => {
        this.artistAlbums = res.items;
      })
      this._spotifyService.getArtist(id).subscribe( res => {
        this.artistInfo = res;
      })
    }));

    //subscribes to previous results coming from main to be used in the navigation.
    this._spotifyService.prevResults.subscribe(prevResults => this.prevResults = prevResults);
    this._spotifyService.prevSearchString.subscribe(prevSearchString => this.prevSearchString = prevSearchString);
  
    if(!this.prevResults.getOwnPropertyNames){
      this.prevResults = JSON.parse(localStorage.getItem('last-result'));
    }
    if(!this.prevSearchString){
      this.prevSearchString = localStorage.getItem('last-query');
    }
  }

  ngOnDestroy() {
    //sets the artistInfo to be used in the future as previous artistInfo.
    this._spotifyService.prevData.next(this.artistInfo);

    //sets the results searchstring to be used in the future as previous results.
    localStorage.setItem('last-artist', JSON.stringify(this.artistInfo));
  }


}