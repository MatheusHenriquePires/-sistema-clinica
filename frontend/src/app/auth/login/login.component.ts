import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { getApiErrorMessage } from '../../shared/api-error.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4)]],
  });

  protected readonly registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4)]],
  });

  protected isLoading = false;
  protected registerLoading = false;
  protected isRegisterMode = false;
  protected errorMessage = '';
  protected successMessage = '';

  constructor() {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/dashboard']);
    }
  }

  protected toggleMode(registerMode: boolean): void {
    this.isRegisterMode = registerMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  protected submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => void this.router.navigate(['/dashboard']),
        error: (error) => {
          this.errorMessage = getApiErrorMessage(
            error,
            'Falha ao realizar login.',
          );
        },
      });
  }

  protected submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.registerLoading = true;

    this.authService
      .registrar(this.registerForm.getRawValue())
      .pipe(finalize(() => (this.registerLoading = false)))
      .subscribe({
        next: (message) => {
          this.successMessage = message;
          this.loginForm.patchValue(this.registerForm.getRawValue());
          this.isRegisterMode = false;
          this.registerForm.reset();
        },
        error: (error) => {
          this.errorMessage = getApiErrorMessage(
            error,
            'Falha ao registrar usuário.',
          );
        },
      });
  }
}
