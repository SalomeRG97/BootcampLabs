import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from '../../../core/mensajes/message.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingComponent } from '../../../core/common/loading/loading.component';

@Component({
  selector: 'app-login-usuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    LoadingComponent,
  ],
  templateUrl: './login-usuarios.component.html',
  styleUrl: './login-usuarios.component.css',
})
export class LoginUsuariosComponent {
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly seguridadService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm!: FormGroup;
  loading: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      Correo: ['', [Validators.required, Validators.email]],
      Pass: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.seguridadService.login(this.loginForm.value).subscribe({
        next: (resp) => {
          this.seguridadService.guardarToken(resp);
          this.loading = false;
          this.router.navigate(['usuarios']);
        },
        error: (e) =>
          this.messageService.showErrorMessage(
            'Usuario o contraseña incorrectos'
          ),
      });
    } else {
    }
  }
}
