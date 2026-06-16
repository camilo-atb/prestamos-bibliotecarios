import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLoanUseCase } from '../../../../core/application/use-cases/create-loan.use-case';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-loan',
  imports: [CommonModule],
  templateUrl: './modal-loan.html',
  styleUrl: './modal-loan.css',
})
export class ModalLoan {

  private useCase = inject(CreateLoanUseCase);

  isOpen = input(false);
  bookId = input<string | null>(null); // Pedimos el ID del libro para el que se va a crear el préstamo. Esto es necesario para pasar esta información al caso de uso de creación de préstamo y validar que el libro existe y está disponible antes de crear el préstamo.
  userDocument = signal<string>(''); // Agregar señal para almacenar el ID del usuario que realizará el préstamo. Esto es necesario para pasar esta información al caso de uso de creación de préstamo y validar que el usuario existe antes de crear el préstamo.
  close = output<void>(); // Agregamos un output para emitir un evento cuando se cierre el modal. Esto es necesario para que el componente padre pueda escuchar este evento y actualizar su estado en consecuencia, por ejemplo, recargando la lista de libros disponibles después de crear un préstamo.
  errorMessage = signal('');
  save = output<void>();

  notificarCierre(){
    this.close.emit(); // Emitir el evento de cierre para que el componente padre pueda reaccionar, como recargar la lista de libros disponibles después de crear un préstamo.
  }

  notificarGuardado() {
    this.save.emit(); // Emitir el evento de guardado para que el componente padre pueda reaccionar, como recargar la lista de libros disponibles después de crear un préstamo.
  }

  async createLoan() {

    const bookId = this.bookId();

    if (!bookId) {
      this.errorMessage.set(
        'No se ha proporcionado un ID de libro para crear el préstamo.'
      );
      return;
    }

    if (!this.userDocument()) {
      this.errorMessage.set(
        'No se ha proporcionado un ID de usuario para crear el préstamo.'
      );
      return;
    }

    try {

      this.errorMessage.set('');

      await this.useCase.execute(
        this.userDocument(),
        bookId
      );

      this.notificarCierre();
      this.notificarGuardado();

    } catch(error) {

      if (error instanceof HttpErrorResponse) {

        if (error.status === 404) {
          this.errorMessage.set(
            'Usuario no encontrado'
          );
          return;
        }
      }

      if (error instanceof Error) {
        this.errorMessage.set(error.message);
      }

    }
  }

  onInput(event: Event) {

    this.errorMessage.set('');

    this.userDocument.set(
      (event.target as HTMLInputElement).value
    );

  }
}

// Si recibimos mediante input el ID del libro, creería que lo recomendable o más practico es usar el caso de uso de creación de préstamo directamente en el componente del modal, ya que el modal es el encargado de manejar la lógica relacionada con la creación del préstamo, como validar que el usuario existe, que el libro está disponible, y luego llamar al caso de uso para crear el préstamo. Esto mantiene la lógica de negocio encapsulada dentro del modal y hace que el componente padre sea más simple, ya que solo se encarga de abrir el modal y escuchar el evento de cierre para actualizar su estado.
