import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { ProductosComponent } from './dashboard/productos/productos.component';
import { MateriaPrimaComponent } from './dashboard/materia-prima/materia-prima.component';
import { ComprasComponent } from './dashboard/compras/compras.component';
import { VentasComponent } from './dashboard/ventas/ventas.component';
import { PedidosEspecialesComponent } from './dashboard/pedidos-especiales/pedidos-especiales.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { ModalUsuarioComponent } from './dashboard/modal-usuario/modal-usuario.component';
import { TablaUsuariosComponent } from './dashboard/tabla-usuarios/tabla-usuarios.component';
import { ModalEditUsuarioComponent } from './dashboard/modal-edit-usuario/modal-edit-usuario.component';

const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'materia-prima', component: MateriaPrimaComponent },
      { path: 'compras', component: ComprasComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'pedidos-especiales', component: PedidosEspecialesComponent },
      { path: 'modalUsuario', component: ModalUsuarioComponent },
      {path: 'tabla', component: TablaUsuariosComponent},
      {path: 'edit', component: ModalEditUsuarioComponent},
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
