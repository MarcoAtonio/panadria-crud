import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  contraseña: string;
  rol: string;
 
}



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  mostrarModalUsuario: boolean = false;
  mostrarModal() {
    this.mostrarModalUsuario = true;
  }

  cerrarModal() {
    this.mostrarModalUsuario = false;
  }
 
}
