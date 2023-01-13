import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, merge } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import dictionary from '../dictionary.json';
import { ResultComponent } from '../result/result.component';
const words : string[]  = dictionary.words;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * 
 */
export class HomeComponent {
  private router: Router;

  /**
   * 
   * @param router 
   */
  constructor(router: Router) { this.router = router; }
  
  /**
   * 
   * @param $event 
   */
  itemSelected($event: any) {
    let query: string = $event.item;
    this.router.navigate(['/result'], {queryParams: {search: query}});
  }
  
  /**
   * 
   * @param word 
   */
  item(word: string) {
    let query: string = (<HTMLInputElement>document.getElementById("ngForm")).value;
    if(query != null && query != "")
      this.router.navigate(['/result'], {queryParams: {search: query}});
  }
  
  
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  
  /**
   * 
   * @param words 
   * @param word 
   * @returns 
   */
  addWord(words: string[], word: string): string[] {
    if(!words.includes(word))
      words.push(word);
    return words;
  }
  
  /**
   * 
   * @param text$ 
   * @returns {map}
   */
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((searchedTerm) =>
      (searchedTerm === '' ? words : this.addWord(words, searchedTerm) && words.filter((word : string) => 
      word.toLowerCase().startsWith(searchedTerm.toLowerCase())
      )).slice(0, 9) 
      )
      );
    };
    
  }
  
  
  