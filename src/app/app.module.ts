import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    DashboardComponent,
    InicioComponent,
    ProductosComponent,
    MateriaPrimaComponent,
    ComprasComponent,
    VentasComponent,
    PedidosEspecialesComponent,
    UsuariosComponent,
    ModalUsuarioComponent,
    TablaUsuariosComponent,
    ModalEditUsuarioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
