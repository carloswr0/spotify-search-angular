import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  @Output() clearActualSearchString: EventEmitter<any> = new EventEmitter<any>();

  @Input() navDepth:number;
  @Input() prevArtistData:any;
  @Input() prevResults:any;
  @Input() prevSearchString:any;

  @Input() ArtistData:any;
  @Input() AlbumData:any;
  flag:any;
  navContext:string;

  constructor(private _spotifyService:SpotifyService) { }

  ngOnInit() {
    this._spotifyService.subject.subscribe(flag => this.flag = flag);
    this._spotifyService.navContext.subscribe(navContext => this.navContext = navContext);
  }

  clearActualSearchStringMethod() {
    this._spotifyService.prevResults.next([]);
    this._spotifyService.prevSearchString.next("");
    this.clearActualSearchString.emit();
  }

  changeContext(){
    this._spotifyService.navContext.next("Results");
  }
}
