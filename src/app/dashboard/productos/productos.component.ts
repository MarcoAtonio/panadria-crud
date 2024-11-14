import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Producto } from '../../dashboard/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  mostrarModal = false;
  esEdicion = false;
  productoSeleccionado: Producto | null = null;

  nuevoProducto: Producto = {
    id: 0,
    product_name: '',
    price: 0,
    is_stock: true
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  // Cargar los productos desde la API
  cargarProductos() {
    this.authService.getProductos().subscribe({
      next: (productos) => {
        console.log('Productos cargados:', productos);
        this.productos = productos;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la lista de productos.', 'error');
      }
    });
  }

  abrirModal(esEdicion: boolean = false, producto?: Producto) {
    this.esEdicion = esEdicion;
    this.mostrarModal = true;

    if (esEdicion && producto) {
      this.productoSeleccionado = producto;
      this.nuevoProducto = { ...producto };
    } else {
      this.nuevoProducto = { id: 0, product_name: '', price: 0, is_stock: true };
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.productoSeleccionado = null;
  }

  // cargarImagen(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.nuevoProducto.imagen_url = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  editarProducto(producto: Producto) {
    this.abrirModal(true, producto);
  }
  
  agregarProducto() {
    this.authService.createProducto(this.nuevoProducto).subscribe({
      next: (producto) => {
        this.productos.push(producto);
        Swal.fire('Agregado', `El producto "${producto.product_name}" se agregó correctamente.`, 'success');
        this.cerrarModal();
        this.cargarProductos(); // Recargar la lista de productos
      },
      error: () => {
        Swal.fire('Error', 'No se pudo agregar el producto.', 'error');
      }
    });
  }

  guardarCambios() {
    if (this.productoSeleccionado) {
      this.authService.updateProducto(this.nuevoProducto).subscribe({
        next: (productoActualizado) => {
          const index = this.productos.findIndex(p => p.id === productoActualizado.id);
          if (index !== -1) {
            this.productos[index] = productoActualizado;
          }
          Swal.fire('Actualizado', `El producto "${productoActualizado.product_name}" se actualizó correctamente.`, 'success');
          this.cerrarModal();
          this.cargarProductos(); // Recargar la lista de productos
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
        }
      });
    }
  }

  eliminarProducto(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Eliminarás el producto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteProducto(id).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== id);
            Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente.', 'success');
            this.cargarProductos(); // Recargar la lista de productos
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }
}
