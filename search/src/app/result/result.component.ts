import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { take, Observable } from 'rxjs';

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
  private apiKey: string = "50bfe276-2aef-4826-b93c-100c4528c37f";
  private url: string;
  private data: Observable<Object>;
  private  definition: string = "my style";
  private synonyms: string[];
  private jsonData: any;

  /**
   * 
   * @param http 
   * @param activatedRoute 
   */
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.word = params['search'];
    });

    this.url = `https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/`
    + `${this.word}?key=${this.apiKey}`;

    // A NOTE REGARDING UNSUBSCRIBING    
    // @Reto and @codef0rmer had quite rightly pointed out that, as per the official docs,
    // an unsubscribe() inside the components onDestroy() method is unnecessary in this instance. 
    // This has been removed from my code sample. (see blue alert box in this tutorial)
    this.data = this.http.get(this.url);
  }
  
  ngOnInit(): void {
    this.data.pipe(take(1)).subscribe((info) => {this.jsonData = info});
  };

  
  public getDefintion(): string {
    if(typeof this.jsonData == 'object') return `No Results Found for ${this.word}`;
    return `Result: ${this.jsonData[0]['def'][0]['sseq'][0][0][1]["dt"][0][1]}`
  }
  
  onClick() : void{
    console.log("Test");
  }

}
