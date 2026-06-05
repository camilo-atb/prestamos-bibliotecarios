import { Loan } from "../entities/loan.model";

export function isOverdue(loan: Loan): boolean {
  const today = new Date();
    return (loan.status === 'ACTIVE' && !loan.returnDate && new Date(loan.dueDate) < today);
}
