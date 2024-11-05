import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Propiedades para el menú lateral y modal
  menuOculto: boolean = false;
  mostrarModal: boolean = false;
  esEdicion: boolean = false;

  // Propiedades para los productos
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Pan de Chocolate',
      descripcion: 'Pan suave con relleno de chocolate',
      imagen_url: 'https://example.com/pan-de-chocolate.jpg',
      precio: 15.00,
      cantidad: 30
    },
    {
      id: 2,
      nombre: 'Croissant',
      descripcion: 'Croissant recién horneado y crujiente',
      imagen_url: 'https://example.com/croissant.jpg',
      precio: 20.00,
      cantidad: 15
    },
    {
      id: 3,
      nombre: 'Concha',
      descripcion: 'Pan dulce típico con cobertura de azúcar',
      imagen_url: 'https://example.com/concha.jpg',
      precio: 10.00,
      cantidad: 25
    },
    {
      id: 4,
      nombre: 'Baguette',
      descripcion: 'Pan francés crujiente por fuera y suave por dentro',
      imagen_url: 'https://example.com/baguette.jpg',
      precio: 25.00,
      cantidad: 10
    }
  ];
  
  productoSeleccionado: Producto | null = null;

  // Nuevo producto (para agregar o editar)
  nuevoProducto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagen_url: '',
    precio: 0,
    cantidad: 0,
  };

  constructor(private router: Router) {}

  // Función para alternar el menú lateral
  toggleMenu() {
    this.menuOculto = !this.menuOculto;
  }

  // Función para abrir el modal (para agregar o editar)
  abrirModal(esEdicion: boolean = false, producto?: Producto) {
    this.esEdicion = esEdicion;
    this.mostrarModal = true;

    if (esEdicion && producto) {
      this.productoSeleccionado = producto;
      this.nuevoProducto = { ...producto };
    } else {
      this.nuevoProducto = { id: 0, nombre: '', descripcion: '', imagen_url: '', precio: 0, cantidad: 0 };
    }
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
    this.productoSeleccionado = null;
  }

  // Función para cargar la imagen desde el dispositivo
  cargarImagen(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoProducto.imagen_url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Función para agregar un producto
  agregarProducto() {
    this.nuevoProducto.id = this.productos.length + 1;
    this.productos.push({ ...this.nuevoProducto });
    Swal.fire(
      'Agregado',
      `El producto "${this.nuevoProducto.nombre}" se agregó correctamente.`,
      'success'
    );
    this.cerrarModal();
  }

  // Función para guardar los cambios al editar un producto
  guardarCambios() {
    if (this.productoSeleccionado) {
      const index = this.productos.findIndex(p => p.id === this.productoSeleccionado?.id);
      if (index !== -1) {
        this.productos[index] = { ...this.nuevoProducto };
      }
      Swal.fire(
        'Actualizado',
        `El producto "${this.nuevoProducto.nombre}" se actualizó correctamente.`,
        'success'
      );
      this.cerrarModal();
    }
  }

  // Función para abrir el modal de edición con el producto seleccionado
  editarProducto(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      this.abrirModal(true, producto);
    }
  }

  // Función para eliminar un producto con confirmación de SweetAlert
  eliminarProducto(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Eliminarás el producto "${producto.nombre}".`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productos = this.productos.filter(p => p.id !== id);
          Swal.fire(
            'Eliminado',
            `El producto "${producto.nombre}" ha sido eliminado correctamente.`,
            'success'
          );
        }
      });
    }
  }

  // Función para cerrar sesión
  cerrarSesion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Vas a cerrar sesión.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500 
        });
        this.router.navigate(['/']); // Redirige a la página de inicio de sesión
      }
    });
  }
}
