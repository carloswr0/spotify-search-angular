import { Injectable } from '@angular/core';
//necesitamos algo para hacer request:
import {Http, Headers} from '@angular/http';

import { map, switchMap } from "rxjs/operators";
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private searchUrl:string;
  private ArtistUrl:string;
  private AlbumsUrl:string;
  private albumId:string;

  //observables
  public _subject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public _navContext: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public _prevData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public _prevResults: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public _prevSearchString: BehaviorSubject<any> = new BehaviorSubject<any>("");
  //observables

  constructor(private _http:Http) { }

  get subject() {
    return this._subject;
  }

  get navContext() {
    return this._navContext;
  }

  get prevData() {
    return this._prevData;
  }

  get prevResults() {
    return this._prevResults;
  }

  get prevSearchString() {
    return this._prevSearchString;
  }

  /*searchMusic(str:string, type='artist') {
    let token = sessionStorage.getItem('token');
    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type;
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this._http.get(this.searchUrl , {headers : headers})
    .pipe(map(res => res.json()));
  }*/

  searchMusicV2(urls: string): Observable<string> {
    let token = sessionStorage.getItem('token');
    this.searchUrl = 'https://api.spotify.com/v1/search?query='+urls+'&offset=0&limit=20&type=artist';
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);

    return from(urls).pipe(
      switchMap(id =>
        <Observable<any>> this._http.get(this.searchUrl, {headers : headers}))
    );
  }

  getAlbums(artistId:string) {
    let token = sessionStorage.getItem('token');
    this.AlbumsUrl = 'https://api.spotify.com/v1/artists/'+ artistId + '/albums/?query=&limit=20';
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this._http.get(this.AlbumsUrl , {headers : headers})
      .pipe(map(res => res.json()));
  }

  getArtist(artistId:string) {
    let token = sessionStorage.getItem('token');
    this.ArtistUrl = 'https://api.spotify.com/v1/artists/'+ artistId;
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this._http.get(this.ArtistUrl , {headers : headers})
      .pipe(map(res => res.json()));
  }

  getOneAlbum(id:string) {
    let token = sessionStorage.getItem('token');
    this.albumId = 'https://api.spotify.com/v1/albums/'+ id;
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this._http.get(this.albumId , {headers : headers})
      .pipe(map(res => res.json()));
  }



  clearTokenStorage() {
    localStorage.clear();
  }
}
