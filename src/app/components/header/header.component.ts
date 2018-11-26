import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  artistPage:boolean;
  showSearchBar:boolean = false;
  smallScreen:boolean = false;

  context:string="header";
  searchString:string;


  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit() {
    this._spotifyService.subject.subscribe(artistPage => this.artistPage = artistPage);
    this._spotifyService.prevSearchString.subscribe(prevSearchString => this.searchString = prevSearchString);

    if(window.innerWidth <= 570){
      this.smallScreen = true;
    }
  }

  toggleSearchbar() {
    this.showSearchBar = !this.showSearchBar;
    $(document).ready(function(){
      $(".retractable-searchbar").slideToggle(); //toggle
    });
  }

  onResize(event){
    if(event.target.innerWidth <= 570){
      this.smallScreen = true;
    }else{
      this.smallScreen = false;
      $(".retractable-searchbar").hide(); //hide
      this.showSearchBar = false;
    }
  }
}
