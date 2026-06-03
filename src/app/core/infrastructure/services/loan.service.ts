import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UpdateLoanDto } from '../../domain/dtos/update-loan.dto';
import { CreateLoanDto } from '../../domain/dtos/create-loan.dto';
import { Observable } from 'rxjs';
import { Loan } from '../../domain/entities/loan.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  http = inject(HttpClient);

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${environment.apiUrl}${environment.endpoints.loans}`);
  }

  getActiveLoansByUser(userId: string): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${environment.apiUrl}${environment.endpoints.loans}?userId=${userId}&status=ACTIVE`);
  }

  getLoandById(loanId: string): Observable<Loan> {
    return this.http.get<Loan>(`${environment.apiUrl}${environment.endpoints.loans}/${loanId}`);
  }

  createLoan( loanDto : CreateLoanDto ): Observable<Loan> {
    return this.http.post<Loan>(`${environment.apiUrl}${environment.endpoints.loans}`, loanDto);
  }

  updateLoan( loanDto : UpdateLoanDto ): Observable<Loan> {
    return this.http.put<Loan>(`${environment.apiUrl}${environment.endpoints.loans}/${loanDto.userId}`, loanDto);
  }
}
/*
Casos de uso:
Crear préstamo
Entradas:
- userId
- bookId

Proceso:
- Obtener usuario
- Obtener préstamos activos del usuario
- Verificar que tenga menos de 3
- Verificar que el libro no esté prestado
- Calcular fecha de vencimiento
- Crear préstamo

Salida:
- Préstamo creado
Devolver libro
Entradas:
- loanId

Proceso:
- Buscar préstamo
- Marcar como devuelto

Salida:
- Préstamo actualizado
Consultar libros disponibles
Entradas:
- ninguna

Proceso:
- Obtener libros
- Filtrar los prestados

Salida:
- Lista de libros disponibles
*/
