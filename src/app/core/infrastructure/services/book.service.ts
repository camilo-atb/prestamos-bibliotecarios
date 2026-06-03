import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Book } from '../../domain/entities/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}${environment.endpoints.books}`);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUrl}${environment.endpoints.books}/${bookId}`);
  }

  getBookByTitle(title: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUrl}${environment.endpoints.books}?title=${title}`);
  }

  getBooksByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}${environment.endpoints.books}?author=${author}`);
  }
}
