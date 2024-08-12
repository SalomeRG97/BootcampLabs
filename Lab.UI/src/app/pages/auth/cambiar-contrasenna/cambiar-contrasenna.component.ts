import { Component, inject } from '@angular/core';
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
  selector: 'app-cambiar-contrasenna',
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
  templateUrl: './cambiar-contrasenna.component.html',
  styleUrl: './cambiar-contrasenna.component.css',
})
export class CambiarContrasennaComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dataService = inject(StepperService);

  validacionCodigoExitosa: boolean = false;
  codigoValidacion: string = '';
  errorMessage: string = '';
  correo: string = '';
  contrasennaNueva: string = '';
  contrasennaNuevaValidacion: string = '';
  loading: boolean = false;

  ngOnInit() {
    this.dataService.dataSub$.subscribe((data) => {
      this.correo = data.correo;
      this.codigoValidacion = data.codigo;
    });
  }

  onCambiarContrasenna() {
    this.loading = true;
    if (this.contrasennaNueva !== this.contrasennaNuevaValidacion) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.loading = false;
      return;
    }
    const changePasswordDTO = {
      correo: this.correo,
      codigo: this.codigoValidacion,
      contrasena: this.contrasennaNueva,
    };
    console.log(changePasswordDTO);

    this.authService.changePassword(changePasswordDTO).subscribe({
      next: (resp) => {
        this.authService.guardarToken(resp);
        this.router.navigate(['usuarios']);
        this.loading = false;
      },
      error: (e) => {
        this.errorMessage = e.error;
      },
    });
  }
}
