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
  selector: 'app-validar-codigo',
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
  templateUrl: './validar-codigo.component.html',
  styleUrl: './validar-codigo.component.css',
})
export class ValidarCodigoComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  @Output() stepCompleted = new EventEmitter<void>();
  private readonly dataService = inject(StepperService);
  validacionCodigoExitosa: boolean = false;
  codigoValidacion: string = '';
  errorMessage: string = '';
  correo: string = '';
  loading: boolean = false;

  ngOnInit() {
    this.dataService.data$.subscribe((data) => {
      this.correo = data;
    });
  }
  onValidarCodigo() {
    this.loading = true;
    this.authService
      .validarCodigo(this.correo, this.codigoValidacion)
      .subscribe({
        complete: () => {
          this.validacionCodigoExitosa = true;
          this.dataService.setDataCambio(this.correo, this.codigoValidacion);
          this.errorMessage = '';
          this.loading = false;
          if (this.validacionCodigoExitosa) {
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
