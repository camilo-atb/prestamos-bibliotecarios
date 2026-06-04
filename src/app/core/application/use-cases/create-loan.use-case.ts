import { firstValueFrom, Observable } from "rxjs";
import { BookService } from "../../infrastructure/services/book.service";
import { LoanService } from "../../infrastructure/services/loan.service";
import { UserService } from "../../infrastructure/services/user.service";
import { Loan } from "../../domain/entities/loan.model";

export class CreateLoanUseCase {

  constructor(
    private loanService: LoanService,
    private userService: UserService,
    private bookService: BookService
  ) {}

  async execute( userId: string, bookId: string ): Promise<Loan> {

    // Obtener usuario
    const user = await firstValueFrom(this.userService.getUserById(userId));

    if (!user) {
      throw new Error(
        'Usuario no encontrado'
      );
    }

    // Obtener préstamos activos del usuario
    const activeLoans = await firstValueFrom(this.loanService.getActiveLoansByUser(userId));

    if (activeLoans.length >= 3) {
      throw new Error(
        'El usuario ya tiene 3 préstamos activos'
      );
    }

    // Obtener libro disponible
    const book = await firstValueFrom(this.bookService.getBookById(bookId));

    if (!book || !book.isAvailable) {
      throw new Error(
        'Libro no encontrado o no disponible'
      );
    }

    // Calcular fecha de vencimiento
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // Crear préstamo

    const loan = await firstValueFrom(this.loanService.createLoan({
      userId,
      bookId,
      loanDate : new Date().toISOString(),
      dueDate : dueDate.toISOString(),
      status: 'ACTIVE'
    }));

    return loan;
  }
}

/*
export interface CreateLoanDto {
  userId: string;
  bookId: string;
  loanDate: string;
  dueDate: string;
  status: 'ACTIVE' | 'RETURNED';
}
*/

