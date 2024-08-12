import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'https://localhost:7151/api';

  constructor(private http: HttpClient) {}

  createUsuario(usuario: any) {
    return this.http.post<any>(
      `${this.apiUrl}/Usuarios/CreateUsuario`,
      usuario
    );
  }

  actualizarUsuario(usuario: any) {
    return this.http.put<any>(`${this.apiUrl}/Usuarios/UpdateUsuario`, usuario);
  }

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/Usuarios/GetUsuarios`);
  }

  getUsuarioById(guid: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.apiUrl}/Usuarios/GetUsuarioByGuid/${guid}`
    );
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.apiUrl}/Usuarios/DeleteUsuario/${id}`);
  }
}
