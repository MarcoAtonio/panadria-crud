import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../dashboard/models/usuario.models';  // Importación del modelo unificado

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  mostrarModal = false;
  esEdicion = false;
  usuarioSeleccionado: Usuario | null = null;

  nuevoUsuario: Usuario = {
    usuario_id: 0,
    nombre: '',
    email: '',
    password:'',
    rol_id: 0
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  // Cargar los usuarios desde la API
  cargarUsuarios() {
    this.authService.getUsuarios().subscribe({
      next: (usuarios) => {
        console.log("Usuarios cargados:", usuarios);
        this.usuarios = usuarios;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la lista de usuarios.', 'error');
      }
    });
  }

  abrirModal(esEdicion: boolean = false, usuario?: Usuario) {
    this.esEdicion = esEdicion;
    this.mostrarModal = true;

    if (esEdicion && usuario) {
      this.usuarioSeleccionado = usuario;
      this.nuevoUsuario = { ...usuario };
    } else {
      this.nuevoUsuario = { usuario_id: 0, nombre: '', email: '',password: '', rol_id: 0};
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
  }

  editarUsuario(usuario: Usuario) {
    this.abrirModal(true, usuario);
  }
  
  agregarUsuario() {
    this.authService.createUsuario(this.nuevoUsuario).subscribe({
      next: (usuario) => {
        this.usuarios.push(usuario);
        Swal.fire('Agregado', `El usuario "${this.nuevoUsuario.nombre}" se agregó correctamente.`, 'success');
        this.cerrarModal();
        this.cargarUsuarios();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo agregar el usuario.', 'error');
      }
    });
  }

  guardarCambios() {
    if (this.usuarioSeleccionado) {
      this.authService.updateUsuario(this.nuevoUsuario).subscribe({
        next: (usuarioActualizado) => {
          const index = this.usuarios.findIndex(u => u.usuario_id === usuarioActualizado.usuario_id);
          if (index !== -1) {
            this.usuarios[index] = usuarioActualizado;
          }
          Swal.fire('Actualizado', `El usuario "${this.nuevoUsuario.nombre}" se actualizó correctamente.`, 'success');
          this.cerrarModal();
          this.cargarUsuarios();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
        }
      });
    }
  }

  eliminarUsuario(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Eliminarás el usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUsuario(id).subscribe({
          next: () => {
            this.usuarios = this.usuarios.filter(u => u.usuario_id !== id);
            Swal.fire('Eliminado', 'El usuario ha sido eliminado correctamente.', 'success');
            this.cargarUsuarios();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });
  }
}
