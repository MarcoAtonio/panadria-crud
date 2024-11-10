import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Usuario } from '../usuarios/usuarios.component';
@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent {

  @Input() usuarios: Usuario[] = [];

  @Output() usuarioSeleccionado = new EventEmitter<Usuario>();
  @Output() usuarioEliminado = new EventEmitter<number>();

  eliminarUsuario(id: number) {
    this.usuarioEliminado.emit(id);
  }
  editarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado.emit(usuario); 
  }

  
}
