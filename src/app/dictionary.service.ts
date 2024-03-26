import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }
  getData(word: string) {
    let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${this.api_key}`;
    return this.http.get(url);
  }
}
