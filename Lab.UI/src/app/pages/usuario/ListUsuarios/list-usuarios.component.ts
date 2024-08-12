import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuarios.service';
import { MessageService } from '../../../core/mensajes/message.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../core/models/usuario.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-list-usuarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIcon,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './list-usuarios.component.html',
  styleUrl: './list-usuarios.component.css',
})
export class ListUsuariosComponent implements OnInit {
  usuario: Usuario[] = [];
  displayedColumns: string[] = ['correo', 'nombre', 'guid', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>(this.usuario);

  constructor(
    private _usuarioService: UsuarioService,
    private _messageService: MessageService,
    private _router: Router,
    private _location: Location
  ) {}
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  onBack() {
    this._location.back();
  }

  cargarUsuarios() {
    this._usuarioService.getUsuario().subscribe((resp) => {
      this.usuario = resp;
      this.dataSource.data = this.usuario;
    });
  }

  onCreateUsuario() {
    this._router.navigate(['usuarios/new']);
  }

  onEdit(element: Usuario): void {
    this._router.navigate(['usuarios', element.guid]);
  }

  async onDelete(element: Usuario): Promise<void> {
    let confirm = await this._messageService.confirmDelete();
    if (confirm) {
      this._usuarioService.deleteUsuario(element.id!).subscribe({
        complete: () => {
          this._messageService.showSuccessMesagge(
            'Registro eliminado exitosamente'
          );
          this.cargarUsuarios();
        },
        error: (e) => this._messageService.showErrorMessage(e.error),
      });
    }
  }
}
