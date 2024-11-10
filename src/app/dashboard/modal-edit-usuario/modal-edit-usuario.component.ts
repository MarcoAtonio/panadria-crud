import { Component, Output,Input,EventEmitter} from '@angular/core';
import { Usuario } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-modal-edit-usuario',
  templateUrl: './modal-edit-usuario.component.html',
  styleUrls: ['./modal-edit-usuario.component.css']
})
export class ModalEditUsuarioComponent {
  @Input() nuevoUsuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    rol: ''
  };
  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() guardarCambiosEvent = new EventEmitter<Usuario>();

  cerrar() {
    this.cerrarModalEvent.emit();
  }

  onGuardarCambios() {
    if (this.nuevoUsuario) {
      this.guardarCambiosEvent.emit(this.nuevoUsuario); 
    }
  }
}
