import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-loan',
  imports: [CommonModule],
  templateUrl: './modal-loan.html',
  styleUrl: './modal-loan.css',
})
export class ModalLoan {
  isOpen = input(false);
  bookId = input<string | null>(null);
  userID = signal<string>(''); // Agregar señal para almacenar el ID del usuario que realizará el préstamo. Esto es necesario para pasar esta información al caso de uso de creación de préstamo y validar que el usuario existe antes de crear el préstamo.
  close = output<void>();

  notificarCierre(){
    this.close.emit();
  }
}

