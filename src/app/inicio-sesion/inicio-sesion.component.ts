import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  mostrarContrasena: boolean = false;

  constructor(
    private enrutador: Router,
    private authService: AuthService 
  ) {}

  // Validación para el campo de nombre (solo letras)
  get nombreInvalido(): string | null {
    if (!this.nombre) return 'El nombre es obligatorio.';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nombre)) {
      return 'Solo se permiten letras.';
    }
    return null;
  }

  // Validación para el campo de correo (formato de correo)
  get correoInvalido(): string | null {
    if (!this.correo) return 'El correo es obligatorio.';
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(this.correo)) {
      return 'Por favor ingresa un correo válido (incluye @ y un dominio).';
    }
    return null;
  }

  // Validación para el campo de contraseña (mínimo una mayúscula, una minúscula, un número, un carácter especial, y 8 caracteres)
  get contrasenaInvalida(): string | null {
    if (!this.contrasena) return 'La contraseña es obligatoria.';
    const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
    if (!contrasenaRegex.test(this.contrasena)) {
      return 'La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
    }
    return null;
  }

  // Enviar el formulario si todo es válido
  enviarFormulario() {
    if (!this.nombreInvalido && !this.correoInvalido && !this.contrasenaInvalida) {
      console.log('Cuenta creada:', this.nombre, this.correo);
      // Aquí puedes agregar la lógica para registrar al usuario
    }
  }

  // Alternar visibilidad de la contraseña
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  // Redirigir al usuario al dashboard después de iniciar sesión y mostrar SweetAlert
  iniciarSesion() {
    if (this.correo && this.contrasena && !this.correoInvalido && !this.contrasenaInvalida) {
      this.authService.login(this.correo, this.contrasena).subscribe({
        next: (response) => {
          // Guardar el token en el localStorage
          this.authService.storeToken(response.token);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido a la panadería "Suavicremas"',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.enrutador.navigate(['/dashboard']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo o contraseña incorrectos',
            confirmButtonText: 'Intentar de nuevo'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos correctamente',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  }
}