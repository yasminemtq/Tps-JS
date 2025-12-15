import { Component } from '@angular/core';
import { BookNamePipe } from '../book-name-pipe';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.html',
  imports: [BookNamePipe]
})
export class BooksComponent {
  books = [
    { name: 'Heros', year: 2021 },
    { name: 'Adventure', year: 2022 },
    { name: 'Mystery', year: 2019 }
  ];
}
