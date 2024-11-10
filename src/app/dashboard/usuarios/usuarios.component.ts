import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export interface Usuario {
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

  eliminarUsuario(id: number) {
    const usuarioIndex = this.usuarios.findIndex(usuario => usuario.id === id);
    if (usuarioIndex !== -1) {
      this.usuarios.splice(usuarioIndex, 1);
      Swal.fire({
        title: 'Eliminado',
        text: 'El usuario ha sido eliminado correctamente.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el usuario.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }

  cargarUsuarioParaEditar(usuario: Usuario) {
    console.log('Usuario seleccionado para editar:', usuario); // Log de depuración
    this.nuevoUsuario = { ...usuario }; // Clona el usuario para edición
    this.mostrarModalUsuario = true; // Muestra el modal de edición
  }

  editarUsuario(usuarioEditado: Usuario) {
    const index = this.usuarios.findIndex(usuario => usuario.id === usuarioEditado.id);
    if (index !== -1) {
      this.usuarios[index] = { ...usuarioEditado }; // Actualiza el usuario en la lista
      Swal.fire({
        title: 'Actualizado',
        text: `El usuario "${usuarioEditado.nombre}" ha sido actualizado correctamente.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
    this.cerrarModal(); // Cierra el modal después de editar
  }
  
 
}
