export interface CreateLoanDto {
  userId: string;
  bookId: string;
  loanDate: string;
  dueDate: string;
  status: 'ACTIVE' | 'RETURNED';
}

/*
  loanDate: string;
  dueDate: string;
  status: 'ACTIVE' | 'RETURNED';

-> usamos esto ya que no tenemos un backend real por el momento, y esto nos permite simular la creación de un préstamo con una fecha de préstamo y una fecha de vencimiento, además del estado del préstamo.
*/
