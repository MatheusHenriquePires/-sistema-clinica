import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected isSidebarOpen = true;
  protected userEmail = this.authService.getStoredEmail() || 'Usuário';

  protected readonly navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '≡' },
    { label: 'Pacientes', path: '/pacientes', icon: 'P' },
    { label: 'Médicos', path: '/medicos', icon: '⚕' },
    { label: 'Consultas', path: '/consultas', icon: '⊞' },
  ];

  protected toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  protected logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
