import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private api_key: string = "924877a3-f8ff-4be4-8bbe-ab2a8da67232";
  constructor(private http: HttpClient) { }
  getData(word: string) {
    let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${this.api_key}`;
    return this.http.get(url);
  }
}
