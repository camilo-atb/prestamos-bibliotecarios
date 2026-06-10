import { Loan } from "../entities/loan.model";

export type OverdueCheck = Pick<
  Loan,
  'dueDate' | 'returnDate' | 'status'
>;

export function isOverdue(overdueCheck: OverdueCheck): boolean {
  const today = new Date();
  return (overdueCheck.status === 'ACTIVE' && !overdueCheck.returnDate && new Date(overdueCheck.dueDate) < today);
}

export function calculateLoanDueDate( pageCount: number, loanDate: Date ): Date {

  const dueDate = new Date(loanDate); // Creamos una nueva instancia para evitar modificar la fecha original

  if (pageCount <= 100) {
    dueDate.setDate(dueDate.getDate() + 15);
    return dueDate;
  }

  dueDate.setMonth(dueDate.getMonth() + 1);

  return dueDate;
}
