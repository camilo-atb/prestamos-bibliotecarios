import { firstValueFrom } from "rxjs";
import { BookService } from "../../infrastructure/services/book.service";
import { LoanService } from "../../infrastructure/services/loan.service";
import { Loan } from "../../domain/entities/loan.model";

export class GetUserLoansUseCase {
  constructor(private loanService: LoanService) {}

  async execute(userId: string): Promise<Loan[]> {
    const loans = await firstValueFrom(this.loanService.getActiveLoansByUser(userId));
    return loans;
  }

}
