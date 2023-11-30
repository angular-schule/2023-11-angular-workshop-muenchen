import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { BookCreateComponent } from '../book-create/book-create.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BookComponent, BookCreateComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  br = inject(BookRatingService);

  books: Book[] = [
    {
      isbn: '000',
      title: 'Angular',
      description: 'Tolles Buch',
      rating: 5
    },
    {
      isbn: '111',
      title: 'AngularJS',
      description: 'Altes Buch',
      rating: 3
    },
    {
      isbn: '222',
      title: 'jQuery',
      description: 'Uraltes Buch',
      rating: 1
    }
  ];

  constructor(private cd: ChangeDetectorRef) {
    // setTimeout(() => { this.books = []; cd.detectChanges() }, 5000);
  }


  doRateUp(book: Book) {
    const ratedBook = this.br.rateUp(book);
    // const ratedBook = {
    //   ...book,
    //   rating: book.rating >= 5 ? 5: book.rating + 1
    // }

    this.updateAndSortList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.br.rateDown(book);
    this.updateAndSortList(ratedBook);
  }

  updateAndSortList(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating)
  }
}
