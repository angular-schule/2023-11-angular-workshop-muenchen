import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  httpClient = inject(HttpClient);

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('https://api.angular.schule/books');
  }

  getSingleBook(isbn: string): Observable<Book> {
    return this.httpClient.get<Book>('https://api.angular.schule/books/' + isbn + '/slow')
  }
}
