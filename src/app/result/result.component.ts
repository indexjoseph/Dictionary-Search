import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { take, Observable, first } from 'rxjs';
import { readSync } from 'fs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

/**
* 
*/
export class ResultComponent {
  
  private word : string;
  private apiKey: string = "";
  private url: string;
  private data: Observable<Object>;
  private  definition: string = "my style";
  private synonyms: string[];
  public static jsonData: any;
  
  /**
  * 
  * @param http 
  * @param activatedRoute 
  */
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.word = params['search'];
    });
    // https://www.knowledgehut.com/blog/web-development/make-api-calls-angular
    // Stanndard way of making API calls
    this.url = `https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${this.word}?key=${this.apiKey}`;
    
    // A NOTE REGARDING UNSUBSCRIBING    
    // @Reto and @codef0rmer had quite rightly pointed out that, as per the official docs,
    // an unsubscribe() inside the components onDestroy() method is unnecessary in this instance. 
    // This has been removed from my code sample. (see blue alert box in this tutorial)
    this.data = this.http.get(this.url);
  }
  
  ngOnInit(): void {
    // this.data.subscribe((info) => {this.jsonData = info});
    const merriamWebAPICall = this.data.subscribe({
      next(info) {
        // if(info !== undefined){
          console.log("Subscription " + info);
          setJsonData(info);
        // }
      }
      
    });
    
    // Stop listening for location after 10 seconds
    setTimeout(() => {
      merriamWebAPICall.unsubscribe();
    }, 5000);
  };
  
  public getDefintion(): string {
    // console.log(this.jsonData);
    // console.log(Array.isArray(this.jsonData))
    // console.log("Definition" + ResultComponent.jsonData);
    // if(Array.isArray(ResultComponent.jsonData) === true) { return `No Results Found for ${this.word}`; }
    return `Result: ${ResultComponent.jsonData[0]['def'][0]['sseq'][0][0][1]["dt"][0][1]}`
    // return '';
  }
}

function setJsonData(info: Object) {
  ResultComponent.jsonData = info;
}

