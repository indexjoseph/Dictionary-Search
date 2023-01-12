import { Component, ViewChild } from '@angular/core';
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

export class HomeComponent {
  static searchContent: string;
  itemSelected($event: any) {
    HomeComponent.searchContent = $event.item;
    window.location.href = "/result"
    alert(HomeComponent.searchContent);

	}

  item(word: string) {
    HomeComponent.searchContent = 
    (<HTMLInputElement>document.getElementById("ngForm")).value;
    window.location.href = "/result"
    alert(HomeComponent.searchContent);
  }

  title = 'search';
  public model: any;
  
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  addWord(words: string[], word : string) : string[] {

    words.push(word);
    return words;
  }
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


  