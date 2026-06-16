import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Book } from '../../../../core/domain/entities/book.model';
import { GetAvailableBooksUseCase } from '../../../../core/application/use-cases/get-available-books.use-case';
import { CountOverdueLoansUseCase } from '../../../../core/application/use-cases/count-overdue-loans.use-case';
import { ModalLoan } from '../../components/modal-loan/modal-loan';

@Component({
  selector: 'app-available-books-page',
  imports: [ModalLoan],
  templateUrl: './available-books-page.html',
  styleUrl: './available-books-page.css',
})
export class AvailableBooksPage implements OnInit {

  books = signal<Book[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedCategory = signal<string>('All'); // All categories by default. Agregar lógica para cambiar esta señal según la selección del usuario.
  currentPage = signal<number>(1);
  overdueReturns = signal<number>(0);

  selectedBookId = signal<string | null>(null);
  modalOpen = signal(false);
  // itemsPerPage = signal<number>(10);


  private useCase = inject(GetAvailableBooksUseCase);
  private countOverdueLoansUseCase  = inject(CountOverdueLoansUseCase);

  async ngOnInit() {
    // console.log('ngOnInit ejecutado');

    const books = await this.useCase.execute();

    // console.log('Books recibidos:', books);

    this.books.set(books);

    // console.log('Signal:', this.books());
    const overdueCount = await this.countOverdueLoansUseCase .execute();
    this.overdueReturns.set(overdueCount);
  }

  filterBooks = computed(() => {
    const category = this.selectedCategory();
    const allBooks = this.books();

    if (category === 'All') {
      return allBooks;
    }

    return allBooks.filter(book => book.category === category);
  })

  pageBooks = computed(() => {
    const books = this.filterBooks();
    const page = this.currentPage();
    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    return books.slice(startIndex, startIndex + itemsPerPage);
  })

  totalBooks = computed (()=> this.books().length)

  onCategoryChange(category: string) {

    this.selectedCategory.set(category);

    this.currentPage.set(1);

  }

  nextPage() {
    this.currentPage.update(
      page => page + 1
    );
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(
        page => page - 1
      );
    }
  }

  openLoanModal(bookId: string) {
    this.selectedBookId.set(bookId);
    this.modalOpen.set(true);
  }

  closeLoanModal() {
    this.selectedBookId.set(null);
    this.modalOpen.set(false);
  }

  async loadBooks() {

    const books = await this.useCase.execute();

    this.books.set(books);

  }
}
