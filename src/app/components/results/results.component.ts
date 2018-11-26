import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {
  @Input() object:object;
  @Input() context:string;
  navContext:string;

  constructor(private _spotifyService:SpotifyService) { }

  ngOnInit() {
    //subscribing to context to know how manage navigation (home button) behaves
    this._spotifyService.navContext.subscribe(navContext => this.navContext = navContext);
    this._spotifyService.navContext.next("Results");
  }

  ngOnDestroy(): void {
    this._spotifyService.navContext.next("Home");
  }

}
