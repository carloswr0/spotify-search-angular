import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() object:object;
  @Input() context:string;

  constructor() { }

  ngOnInit() {
    //this.memoryFavSongs =  JSON.parse(localStorage.getItem('favorite-songs'));
  }

}
