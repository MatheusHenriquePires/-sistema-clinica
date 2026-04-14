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

  protected readonly navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Pacientes', path: '/pacientes' },
    { label: 'Médicos', path: '/medicos' },
    { label: 'Consultas', path: '/consultas' },
  ];

  protected logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
