import { firstValueFrom } from "rxjs";
import { BookService } from "../../infrastructure/services/book.service";
import { Book } from "../../domain/entities/book.model";

export class GetAvailableBooksUseCase {
  constructor(private bookService: BookService) {}

  async execute(): Promise<Book[]> {
    const books = await firstValueFrom(this.bookService.getBooks());
    return books.filter(book => book.isAvailable);
  }
}
