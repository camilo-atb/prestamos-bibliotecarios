import { Component, inject, signal } from '@angular/core';
import { Book } from '../../../../core/domain/entities/book.model';
import { GetAvailableBooksUseCase } from '../../../../core/application/use-cases/get-available-books.use-case';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-available-books-page',
  imports: [],
  templateUrl: './available-books-page.html',
  styleUrl: './available-books-page.css',
})
export class AvailableBooksPage {

  books = signal<Book[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  private useCase = inject(GetAvailableBooksUseCase);

  async ngOnInit() {
    const books = await this.useCase.execute();

    this.books.set(books);
  }

}
