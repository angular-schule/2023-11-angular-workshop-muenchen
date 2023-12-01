import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookCreateComponent } from '../book-create/book-create.component';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { selectBooks, selectBooksLoading } from '../store/book.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BookComponent, BookCreateComponent, AsyncPipe, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  // br = inject(BookRatingService);
  // bs = inject(BookStoreService);

  // books: Book[] = [];

  books$ = inject(Store).select(selectBooks);
  booksLoading$ = inject(Store).select(selectBooksLoading);

  constructor() {
    // setTimeout(() => { this.books = []; cd.detectChanges() }, 5000);
    // this.bs.getAllBooks().subscribe(books => this.books = books);
  }


  doRateUp(book: Book) {
    // const ratedBook = this.br.rateUp(book);
    // // const ratedBook = {
    // //   ...book,
    // //   rating: book.rating >= 5 ? 5: book.rating + 1
    // // }

    // this.updateAndSortList(ratedBook);
  }

  doRateDown(book: Book) {
    // const ratedBook = this.br.rateDown(book);
    // this.updateAndSortList(ratedBook);
  }

  updateAndSortList(ratedBook: Book) {
    // this.books = this.books
    //   .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
    //   .sort((a, b) => b.rating - a.rating)
  }

  doCreate(book: Book) {
    // this.books = [...this.books, book];
  }
}
