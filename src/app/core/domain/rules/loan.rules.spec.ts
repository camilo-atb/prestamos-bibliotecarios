import { describe, it, expect } from 'vitest';
import { isOverdue, OverdueCheck } from './loan.rules';

describe('isOverdue', () => {
  it('should return true for an active loan that is overdue', () => {

    const loan: OverdueCheck = {
      dueDate: new Date('2024-01-01'),
      returnDate: '',
      status: 'ACTIVE'
    };

    expect(isOverdue(loan)).toBe(true);

  });

  it('should return false for an active loan that is not overdue', () => {

    const loan: OverdueCheck = {
      dueDate: new Date('2024-12-31'),
      returnDate: '',
      status: 'ACTIVE'
    };

    expect(isOverdue(loan)).toBe(false);

  });

  it('should return false for a returned loan', () => {

    const loan: OverdueCheck = {
      dueDate: new Date('2024-01-01'),
      returnDate: '2023-12-31',
      status: 'RETURNED'
    };

    expect(isOverdue(loan)).toBe(false);

  });
});

/*
export interface Loan {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate: string;
  status: LoanStatus;
}
*/

/*
Para el test no debemos preguntarnos ¿Cómo hago el test?
Sino: ¿Qué comportamientos tiene esta función?

Asi que podriamos tener varias reglas:

Caso 1
- Préstamo activo.
- No tiene fecha de devolución.
- La fecha límite ya pasó.
Resultado: true
Ya

------------------------------------------------

Caso 2
- Préstamo activo.
- No tiene fecha de devolución.
- La fecha límite es futura.
Resultado: false
Ya

------------------------------------------------

Caso 3
- Préstamo no activo.
Resultado: false

*/
