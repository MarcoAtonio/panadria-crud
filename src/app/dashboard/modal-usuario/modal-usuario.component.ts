import { Component,EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent {
  @Output() cerrarModalEvent = new EventEmitter<void>();

  cerrar() {
    this.cerrarModalEvent.emit();
  }
}
