import { Component,EventEmitter, Output ,Input } from '@angular/core';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent {

  @Input() nuevoUsuario: any; 
  @Output() cerrarModalEvent = new EventEmitter<void>();

  cerrar() {
    this.cerrarModalEvent.emit();
  }

  @Output() crearUsuario = new EventEmitter<void>();
  onCrearUsuario() {
    this.crearUsuario.emit();  
  }
  
}
