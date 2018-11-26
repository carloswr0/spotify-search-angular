import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  @Output() stopRequestHelp: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  selectedId:any;

  ngOnInit() {

    
  }

  stopRequestingHelp(data) {
    this.stopRequestHelp.emit(data);
  }

  liClick(data){
    if(data === this.selectedId){
      this.selectedId = 0;
    }else{
      this.selectedId = data;
    }
  }

}
