import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { LoadingComponent } from './core/common/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterOutlet,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LabUI';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loading: boolean = false;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
