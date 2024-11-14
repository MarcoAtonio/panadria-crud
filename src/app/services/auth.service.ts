import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../dashboard/models/usuario.models';  // Importación del modelo unificado
import { Producto } from '../dashboard/models/producto.model';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001'; // Cambiar a la URL de tu API
  private tokenKey = 'authToken'; // El nombre de la clave del token en el localStorage

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    const token = this.getToken();

    // Direct configuration of headers as an object instead of HttpHeaders instance
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };

    console.log("Sending request to get users with headers:", headers);

    return this.http.get<{ ok: boolean; status: number; body: Usuario[] }>(`${this.apiUrl}/api/usuarios`, { headers })
    .pipe(
      map(response => {
        console.log("API response received:", response);
        return response.body;  // Cambiamos a "body" en lugar de "data"
      }),
      catchError(error => {
        console.error("Error in API response:", error);
        throw error;
      })
    );
  }

  // Crear un nuevo usuario
  createUsuario(usuario: Usuario): Observable<Usuario> {
    const token = this.getToken();
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<Usuario>(`${this.apiUrl}/api/usuarios`, usuario, { headers });
  }

  // Actualizar un usuario existente
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    const token = this.getToken();
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<Usuario>(`${this.apiUrl}/api/usuarios/${usuario.usuario_id}`, usuario, { headers });
  }

  // Eliminar un usuario
  deleteUsuario(id: number): Observable<void> {
    const token = this.getToken();
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<void>(`${this.apiUrl}/api/usuarios/${id}`, { headers });
  }


  // Iniciar sesión y almacenar el token
  login(correo: string, password: string): Observable<any> {
    //const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<any>(`${this.apiUrl}/auth`, { correo, password }, { withCredentials: true });
  }

  // Almacenar el token en localStorage
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verificar si el token existe y no ha expirado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decodedToken = this.decodeToken(token);
    return decodedToken && decodedToken.exp > Date.now() / 1000;
  }

  // Decodificar el token JWT
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  // Hacer peticiones con el token JWT
  getAuthenticatedRequest(url: string): Observable<any> {
    const token = this.getToken();
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<any>(url, { headers });
  }

  getProductos(): Observable<Producto[]> {
    const token = this.getToken();
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<{ ok: boolean; status: number; body: Producto[] }>(`${this.apiUrl}/api/products`, { headers })
      .pipe(
        map(response => response.body),
        catchError(error => {
          console.error('Error al obtener productos', error);
          throw error;
        })
      );
  }

  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<Producto> {
    const token = this.getToken();
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<Producto>(`${this.apiUrl}/api/products`, producto, { headers });
  }

  // Actualizar un producto existente
  updateProducto(producto: Producto): Observable<Producto> {
    const token = this.getToken();
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<Producto>(`${this.apiUrl}/api/products/${producto.id}`, producto, { headers });
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<void> {
    const token = this.getToken();
    const headers = {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<void>(`${this.apiUrl}/api/products/${id}`, { headers });
  }
}
