import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
//importamos el servicio 
import { SpotifyService } from './services/spotify.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpotifyService]
})
export class AppComponent {
  navigationFlow = {
    isAuthenticated: false,
    isHelpShowed: false,
  };
  token = "";
  memoryToken = "";
  constructor( private _spotifyService:SpotifyService) { }

  ngOnInit() {
    this.token = window.location.hash.split('=')[1];
    if(this.token) {
      sessionStorage.setItem('token',this.token);
      this.navigationFlow.isAuthenticated = true;
    }else{
      this.memoryToken = sessionStorage.getItem('token');
      if(this.memoryToken) {
        this.navigationFlow.isAuthenticated = true;
      }
    }
  }

  requestHelp(){
    this.navigationFlow.isHelpShowed = true;
  }
  
  stopRequestHelp(){
    this.navigationFlow.isHelpShowed = false;
  }

  requestToken(){
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=1d449aa39a5745a9b8cb38b6f69d7052&redirect_uri=http://localhost:8080/&response_type=token';
  }
}
