import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { PacienteService } from '../services/paciente.service';
import { getApiErrorMessage } from '../shared/api-error.util';
import { Paciente } from '../shared/models';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
})
export class PacientesComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly pacienteService = inject(PacienteService);

  protected pacientes: Paciente[] = [];
  protected isLoading = true;
  protected isSaving = false;
  protected showForm = false;
  protected errorMessage = '';
  protected successMessage = '';

  protected readonly form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.loadPacientes();
  }

  protected loadPacientes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.pacienteService.listar().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = getApiErrorMessage(
          error,
          'Não foi possível carregar os pacientes.',
        );
        this.isLoading = false;
      },
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.pacienteService
      .criar(this.form.getRawValue())
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.successMessage = 'Paciente cadastrado com sucesso.';
          this.form.reset();
          this.showForm = false;
          this.loadPacientes();
        },
        error: (error) => {
          this.errorMessage = getApiErrorMessage(
            error,
            'Não foi possível cadastrar o paciente.',
          );
        },
      });
  }

  protected deletePaciente(paciente: Paciente): void {
    if (!paciente.id) {
      return;
    }

    const confirmed = window.confirm(
      `Deseja deletar o paciente ${paciente.nome}?`,
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.pacienteService.deletar(paciente.id).subscribe({
      next: () => {
        this.successMessage = 'Paciente removido com sucesso.';
        this.loadPacientes();
      },
      error: (error) => {
        this.errorMessage = getApiErrorMessage(
          error,
          'Não foi possível remover o paciente.',
        );
      },
    });
  }

  protected trackPaciente(_: number, paciente: Paciente): number | string {
    return paciente.id ?? paciente.cpf;
  }
}
