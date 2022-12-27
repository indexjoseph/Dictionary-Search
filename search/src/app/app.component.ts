import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search';
  public searchInput!: string;
  public programmingLanguages = [
      'Python','TypeScript','C','C++','Java',
      'Go','JavaScript','PHP','Ruby','Swift','Kotlin'
 ]
}
