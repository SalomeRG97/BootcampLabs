import { Component, inject, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidarCorreoComponent } from '../validar-correo/validar-correo.component';
import { ValidarCodigoComponent } from '../validar-codigo/validar-codigo.component';
import { CambiarContrasennaComponent } from '../cambiar-contrasenna/cambiar-contrasenna.component';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
Component;

@Component({
  selector: 'app-recuperar-contrasenna',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ValidarCorreoComponent,
    ValidarCodigoComponent,
    CambiarContrasennaComponent,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './recuperar-contrasenna.component.html',
  styleUrl: './recuperar-contrasenna.component.css',
})
export class RecuperarContrasennaComponent {
  isLinear = false;
  @ViewChild('stepper')
  private stepper!: MatStepper;
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  onBack() {
    this.location.back();
  }

  onStepCompleted(step: number) {
    if (this.stepper) {
      this.stepper.selectedIndex = step;
      // Navegar a la ruta del siguiente paso
      switch (step) {
        case 1:
          this.router.navigate(['cambiar-contrasenna/validarcodigo']);
          break;
        case 2:
          this.router.navigate(['cambiar-contrasenna/cambiarcontrasenna']);
          break;
        default:
          break;
      }
    }
  }
}
