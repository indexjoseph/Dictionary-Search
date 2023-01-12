import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
//TODO: https://stackoverflow.com/questions/46213737/angular-append-query-parameters-to-url
  word : string = HomeComponent.searchContent;
  onClick() : void{
    alert(this.word);
  }
}
