import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterOutlet,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
