import { Component, OnInit} from '@angular/core';
//importamos el servicio
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from "../../models/Artist";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  public context:string = "artist";
  public favorites:string = "favorites";

  tempSongs_ = [];

  memoryFavSongs:any = []; //Localstorage favorites
  searchString:string;     //Search string query
  searchRes: Artist[];     //Search result

  prevResults:any;
  prevSearchString:any;

  loadingRequest:boolean = false;

  navContext:string;
  constructor(private _spotifyService:SpotifyService) {}

  ngOnInit() {

    //subscribing to context to know how manage navigation (home button) behaves
    this._spotifyService.navContext.subscribe(navContext => this.navContext = navContext);
    //this._spotifyService.navContext.next("Home");

    //Changes subject to false. (the user is watching the main menu)
    this._spotifyService.subject.next(false);

    //Subscribe to previous results and search strings.
    this._spotifyService.prevResults.subscribe(prevResults => this.prevResults = prevResults);
    this._spotifyService.prevSearchString.subscribe(prevSearchString => this.prevSearchString = prevSearchString);

    //it need to check if its rendering normally or needs to get data.
    if(this.navContext === "Results") {
      //if it didnt found anything grabs it from localstorage.
      if(!this.prevResults.getOwnPropertyNames){
        this.prevResults = JSON.parse(localStorage.getItem('last-result'));
      }
      if(!this.prevSearchString){
        this.prevSearchString = localStorage.getItem('last-query');
      }
      //
      //Checks if it has previous results/searchstring, if not -> assign them to present results.
      if(this.prevResults && this.prevSearchString){
        this.searchString = this.prevSearchString;
        this.searchRes = this.prevResults;
      }
    }else{
      this.clearActualSearchString();
    }

    //Tries to grab favorites from localstorage.
    this.memoryFavSongs = localStorage.getItem('favorite-songs');
    //If it didnt grabbed anything, set localstorage to empty array [] for further use.
    if(!this.memoryFavSongs) {
      localStorage.setItem('favorite-songs', "[]");
    }
    this.memoryFavSongs = JSON.parse(this.memoryFavSongs);
  }

  searchMusic(searchString){
    this.loadingRequest = true;


    /*this._spotifyService.searchMusic(searchString ,'artist').subscribe(res=> {
      this.searchRes = res.artists.items;
      this.loadingRequest = false;
    });*/


    this._spotifyService.searchMusicV2(searchString).subscribe(item => {
      let temp = item.json();
      this.searchRes = temp.artists.items;
    });
    this.loadingRequest = false;

    //
    this.searchString = searchString;
  }




  clearActualSearchString() {
    //to clear present results and search string when coming back from another component.
    this.searchString = "";
    this.searchRes = [];
    this.prevResults = [];
    this.prevSearchString = "";
  }

  ngOnDestroy(){
    //sets the results searchstring to be used in the future as previous results.
    this._spotifyService.prevResults.next(this.searchRes);
    this._spotifyService.prevSearchString.next(this.searchString);

    //sets the results searchstring to be used in the future as previous results.
    localStorage.setItem('last-result', JSON.stringify(this.searchRes));
    localStorage.setItem('last-query', this.searchString);
  }
}
