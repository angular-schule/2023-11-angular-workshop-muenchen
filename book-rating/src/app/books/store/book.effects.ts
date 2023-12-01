import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BookStoreService } from '../shared/book-store.service';
import { BookActions } from './book.actions';


@Injectable()
export class BookEffects {

  bookStore = inject(BookStoreService);

  loadBooks$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.bookStore.getAllBooks().pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });
}
