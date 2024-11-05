import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  fechaActualizacion!: string; // Con el operador '!' para indicar que será inicializada

  ngOnInit(): void {
    // Formatear la fecha y hora de la última actualización
    const fecha = new Date();
    this.fechaActualizacion = fecha.toLocaleString();
  }
}
