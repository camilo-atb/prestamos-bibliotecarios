// type LoanStatus = 'ACTIVE' | 'RETURNED' | 'OVERDUE';

type LoanStatus = 'ACTIVE' | 'RETURNED';

export interface Loan {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  dueDate: Date;
  status: LoanStatus;
}

/*
1. Un usuario no puede tener más de 3 préstamos activos.

2. Un libro no puede tener más de un préstamo activo.

3. La fecha de vencimiento es 15 días después del préstamo.

4. Un préstamo puede estar:
  - Activo
  - Devuelto
  - Vencido
*/

/*
No todas las reglas van en el caso de uso, pero los casos de uso son quienes las orquestan.
*/

/*
Cada vez que vayas a crear un archivo, pregúntate:

¿Esto representa algo que el usuario quiere hacer?

Si la respuesta es sí:

use-case

Ejemplos:

- Crear préstamo
- Devolver libro
- Consultar préstamos
- Consultar libros disponibles

Si la respuesta es:

No, esto es una validación o una regla.

Entonces probablemente sea:

  Lógica interna del caso de uso

o más adelante:

  Domain Rule
*/
