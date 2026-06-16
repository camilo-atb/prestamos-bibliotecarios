import { firstValueFrom, Observable } from "rxjs";
import { BookService } from "../../infrastructure/services/book.service";
import { LoanService } from "../../infrastructure/services/loan.service";
import { UserService } from "../../infrastructure/services/user.service";
import { Loan } from "../../domain/entities/loan.model";
import { calculateLoanDueDate } from "../../domain/rules/loan.rules";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CreateLoanUseCase {

  constructor(
    private loanService: LoanService,
    private userService: UserService,
    private bookService: BookService
  ) {}

  async execute( userDocument: string, bookId: string ): Promise<Loan> {

    // Obtener usuario
    const user = await firstValueFrom(this.userService.getUserByDocument(userDocument)); // firstValueFrom se utiliza para convertir el Observable en una Promesa y obtener el valor resultante. Esto es necesario porque los métodos de los servicios devuelven Observables, pero en este caso queremos trabajar con Promesas para facilitar la lógica asíncrona en el use case.

    if (!user) {
      throw new Error(
        'Usuario no encontrado'
      );
    } // Necesitaremos un modal para pasar el usuario al caso de uso, o un input en el formulario de préstamo para seleccionar el usuario. Esto es importante para validar que el usuario existe antes de crear el préstamo. Si el usuario no existe, se lanzará un error y no se procederá con la creación del préstamo.

    // Obtener préstamos activos del usuario
    const activeLoans = await firstValueFrom(this.loanService.getActiveLoansByUser(userDocument));

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
    const dateLoan = new Date();
    const dueDate = calculateLoanDueDate(book.pages, dateLoan);



    // Crear préstamo

    const loan = await firstValueFrom(this.loanService.createLoan({
      documentId: userDocument,
      bookId,
      loanDate : dateLoan.toISOString(),
      dueDate : dueDate.toISOString(),
      status: 'ACTIVE'
    }));

    // Actualizar disponibilidad del libro
    await firstValueFrom(this.bookService.updateBookAvailability(bookId, false));

    return loan;
  }
}

/*
export interface CreateLoanDto {
  documentId: string;
  bookId: string;
  loanDate: string;
  dueDate: string;
  status: 'ACTIVE' | 'RETURNED';
}
*/

