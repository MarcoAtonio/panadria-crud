import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: string;
 
}



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Carlos',
      correo: 'carlos@gmail.com',
      contrasena: 'carl123!',
      rol: 'Admin',
      
    },

    {
      id: 2,
      nombre: 'Elias',
      correo: 'Elias@gmail.com',
      contrasena: 'elia123!',
      rol: 'Gerente',
      
    },
  
  ]

  nuevoUsuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    rol: '',
  };
  constructor(private router: Router) {}

  agregarUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.contrasena || !this.nuevoUsuario.rol) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, rellena todos los campos antes de continuar.',
        icon: 'error',
        timer: 1000,  
        showConfirmButton: false  
      });
      return;
    }
  
    this.nuevoUsuario.id = this.usuarios.length + 1;
    this.usuarios.push({ ...this.nuevoUsuario });
    Swal.fire({
      title: 'Agregado',
      text: `El Usuario "${this.nuevoUsuario.nombre}" se agregó correctamente.`,
      icon: 'success',
      timer: 2000,  
      showConfirmButton: false  
    });
    this.cerrarModal();
  }


  mostrarModalUsuario: boolean = false;
  mostrarModal() {
    this.mostrarModalUsuario = true;
  }

  cerrarModal() {
    this.mostrarModalUsuario = false;
  }
 
}
