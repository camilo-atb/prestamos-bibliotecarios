import { firstValueFrom } from "rxjs";
import { LoanService } from "../../infrastructure/services/loan.service";
import { BookService } from "../../infrastructure/services/book.service";

export class ReturnLoanUseCase {
  constructor(
    private loanService: LoanService,
    private bookService: BookService
  ) {}

  async execute( loanId: string ): Promise<void> {
    // Aquí iría la lógica para devolver un préstamo
    // Por ejemplo:
    // 1. Obtener el préstamo por su ID

    const loan = await firstValueFrom(this.loanService.getLoandById(loanId));

    // 2. Verificar que el préstamo existe y está activo

    if (!loan) {
      throw new Error('Préstamo no encontrado');
    }

    if (loan.status !== 'ACTIVE') {
      throw new Error('El préstamo no está activo');
    }

    // 3. Actualizar el estado del préstamo a "DEVUELTO"

    await firstValueFrom(this.loanService.updateLoan({
      id: loan.id,
      returnDate: new Date().toISOString(),
      status: 'RETURNED'
    }))

    // 4. Actualizar la disponibilidad del libro asociado al préstamo

    await firstValueFrom(this.bookService.updateBookAvailability(loan.bookId, true));
  }
}
