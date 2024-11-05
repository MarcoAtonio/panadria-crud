import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router de Angular para la navegación
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
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
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
  mostrarModal = false;
  esEdicion = false;
  productoSeleccionado: Producto | null = null;

  nuevoProducto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagen_url: '',
    precio: 0,
    cantidad: 0,
  };

  constructor(private router: Router) {} // Inyecta el router en el constructor

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

  cerrarModal() {
    this.mostrarModal = false;
    this.productoSeleccionado = null;
  }

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

  editarProducto(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      this.abrirModal(true, producto);
    }
  }

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

  cerrarSesion() {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar Sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']); // Redirige al login
      }
    });
  }
}
