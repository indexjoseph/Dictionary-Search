import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  private apiKey: string = "924877a3-f8ff-4be4-8bbe-ab2a8da67232";
  private url: string;
  private data: Observable<Object>;
  private defintion: string;
  private synonyms: string[];

  /**
   * 
   * @param http 
   * @param activatedRoute 
   */
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.word = params['search'];
    });
    this.url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.word}?key=${this.apiKey}`;

    // A NOTE REGARDING UNSUBSCRIBING    
    // @Reto and @codef0rmer had quite rightly pointed out that, as per the official docs,
    // an unsubscribe() inside the components onDestroy() method is unnecessary in this instance. 
    // This has been removed from my code sample. (see blue alert box in this tutorial)
    this.data = this.http.get(this.url);
    this.data.subscribe((info)=> (console.log(info)));
  }
  
  
  
  onClick() : void{
    console.log("Test");
  }
  
}
