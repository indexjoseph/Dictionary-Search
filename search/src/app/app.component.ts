import { Component, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, merge } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import dictionary from './dictionary.json';

const words : string[]  = dictionary.words;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    
})

export class AppComponent {
    title = 'search';
    
    public model: any;
    
    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((searchedTerm) =>
				(searchedTerm === '' ? words : words.filter((word : string) => 
                word.toLowerCase().startsWith(searchedTerm.toLowerCase())
			    )).slice(0, 9)
            )
		);
	};
}
    