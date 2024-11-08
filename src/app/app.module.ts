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
    PedidosEspecialesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule  // Asegúrate de que FormsModule esté aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
