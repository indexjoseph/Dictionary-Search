import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DictionaryService } from '../dictionary.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent {
  
  word : string = HomeComponent.searchContent;
  // public service : DictionaryService;
  // constructuor(service: DictionaryService){
  //   // service.getData(this.word).subscribe(data=> (console.warn(data)))
  
  // }
  
  // onClick() : void{
  //   console.log("Test");
  //   this.service.getData(this.word).subscribe(data=> (console.log(data)))
  
  //   // alert(this.word);
  // }
  
  api_key: string = "924877a3-f8ff-4be4-8bbe-ab2a8da67232";
  constructor(private http: HttpClient) { }
  
  url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.word}?key=${this.api_key}`;
  data = this.http.get(this.url);
  
  
  onClick() : void{
    console.log("Test");
    this.data.subscribe(data=> (console.log(data)));
  }
  
}
