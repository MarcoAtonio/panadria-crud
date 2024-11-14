// src/app/models/usuario.model.ts

export interface Usuario {
    usuario_id: number;
    nombre: string;
    email: string;
    password?: string;  // Opcional para cuando no sea necesario usarla
    rol?: string;
    rol_id?: number;     // Opcional si solo es necesario en ciertas ocasiones
  }
  