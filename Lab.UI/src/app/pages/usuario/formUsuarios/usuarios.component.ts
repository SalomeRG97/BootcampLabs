import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../core/mensajes/message.service';
import { UsuarioService } from '../../../core/services/usuarios.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  isCreateMode = true;
  usuarioForm!: FormGroup;
  mensajeResp = '';

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      let guid = params['guid'];
      if (guid !== 'new') {
        this.isCreateMode = false;
        this._usuarioService.getUsuarioById(guid).subscribe({
          next: (resp) => this.usuarioForm.reset(resp),
          error: () => this._router.navigate(['usuarios']),
        });
      }
    });
  }

  initForm() {
    this.usuarioForm = this.fb.group({
      id: [0], // Campo deshabilitado
      correo: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      nombre: ['', Validators.required],
      guid: '',
      vigencia: [null],
      codigo: '',
    });
  }
  ngAfterViewInit() {
    console.log(
      'Estado del formulario después de la inicialización:',
      this.usuarioForm.value
    );
  }

  onBack() {
    this._location.back();
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      if (this.isCreateMode) {
        console.log(this.usuarioForm.getRawValue());

        this._usuarioService
          .createUsuario(this.usuarioForm.getRawValue())
          .subscribe((resp) => {
            this._messageService.showSuccessMesagge(
              'Registro creado exitosamente'
            );
            this._router.navigate(['usuarios']);
          });
      } else {
        this._usuarioService
          .actualizarUsuario(this.usuarioForm.value)
          .subscribe((resp) => {
            this._messageService.showSuccessMesagge(
              'Registro creado exitosamente'
            );
            this._router.navigate(['usuarios']);
          });
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}
