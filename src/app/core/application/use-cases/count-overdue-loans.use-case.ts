import { inject, Injectable } from "@angular/core";
import { LoanService } from "../../infrastructure/services/loan.service";
import { firstValueFrom } from "rxjs";
import { isOverdue } from "../../domain/rules/loan.rules";

@Injectable({
  providedIn: 'root',
})
export class CountOverdueLoansUseCase {
  loanService = inject(LoanService);

  async execute(): Promise<number> {
    const loans = await firstValueFrom(this.loanService.getLoans());
    return loans.filter((loan) => isOverdue(loan)).length;
  }
}
