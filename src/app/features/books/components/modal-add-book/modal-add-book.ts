import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-modal-add-book',
  imports: [],
  templateUrl: './modal-add-book.html',
  styleUrl: './modal-add-book.css',
})
export class ModalAddBook {
  isOpen = input(false);
  close = output<void>();
  errorMessage = signal('');

  notificarCierre() {
    this.close.emit(); // emitimos el evento de cierre
  }
}
