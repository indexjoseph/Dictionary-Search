import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent {
  //TODO: https://stackoverflow.com/questions/46213737/angular-append-query-parameters-to-url
  word : string = HomeComponent.searchContent;
  constructor(private http: HttpClient){}
  onClick() : void{
    alert(this.word);
  }
}
