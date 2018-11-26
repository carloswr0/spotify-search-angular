import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.sass']
})
export class SearchbarComponent implements OnInit {
  @Output() searchedMusic: EventEmitter<any> = new EventEmitter<any>();
  @Input() context;

  constructor() { }

  ngOnInit() {}

  onKeyUp(string){
    if(this.context !== "header"){
      let tempString;
      if(!string){
        tempString = "";
      }else{
        tempString = string;
      }
      if(tempString.length !== 0){
        this.searchMusicMethod(string);
      };
    }
  }

  searchMusicMethod(string) {
    this.searchedMusic.emit(string);
  }

}
