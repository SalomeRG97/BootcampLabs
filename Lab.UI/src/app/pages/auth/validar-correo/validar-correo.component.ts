import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { StepperService } from '../../../core/services/stepper.service';
import { LoadingComponent } from '../../../core/common/loading/loading.component';

@Component({
  selector: 'app-validar-correo',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    LoadingComponent,
  ],
  templateUrl: './validar-correo.component.html',
  styleUrl: './validar-correo.component.css',
})
export class ValidarCorreoComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dataService = inject(StepperService);
  @Output() stepCompleted = new EventEmitter<void>();

  loading: boolean = false;
  validacionCorreoExitosa: boolean = false;
  errorMessage: string = '';
  correo: string = '';

  onRecuperarContrasenna() {
    this.loading = true;
    this.authService.validarCorreo(this.correo).subscribe({
      complete: () => {
        this.validacionCorreoExitosa = true;
        this.dataService.setData(this.correo);
        this.errorMessage = '';
        this.loading = false;
        if (this.validacionCorreoExitosa) {
          this.stepCompleted.emit();
        }
      },
      error: (e) => {
        this.errorMessage = e.error;
        this.loading = false;
      },
    });
  }
}
