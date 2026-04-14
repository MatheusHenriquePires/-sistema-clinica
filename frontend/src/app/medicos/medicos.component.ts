import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { MedicoService } from '../services/medico.service';
import { getApiErrorMessage } from '../shared/api-error.util';
import { Medico } from '../shared/models';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.css',
})
export class MedicosComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly medicoService = inject(MedicoService);

  protected medicos: Medico[] = [];
  protected isLoading = true;
  protected isSaving = false;
  protected showForm = false;
  protected errorMessage = '';
  protected successMessage = '';

  protected readonly form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    crm: ['', Validators.required],
    especialidade: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.loadMedicos();
  }

  protected loadMedicos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.medicoService.listar().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = getApiErrorMessage(
          error,
          'Não foi possível carregar os médicos.',
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

    this.medicoService
      .criar(this.form.getRawValue())
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.successMessage = 'Médico cadastrado com sucesso.';
          this.form.reset();
          this.showForm = false;
          this.loadMedicos();
        },
        error: (error) => {
          this.errorMessage = getApiErrorMessage(
            error,
            'Não foi possível cadastrar o médico.',
          );
        },
      });
  }

  protected deleteMedico(medico: Medico): void {
    if (!medico.id) {
      return;
    }

    const confirmed = window.confirm(`Deseja deletar o médico ${medico.nome}?`);
    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.medicoService.deletar(medico.id).subscribe({
      next: () => {
        this.successMessage = 'Médico removido com sucesso.';
        this.loadMedicos();
      },
      error: (error) => {
        this.errorMessage = getApiErrorMessage(
          error,
          'Não foi possível remover o médico.',
        );
      },
    });
  }

  protected trackMedico(_: number, medico: Medico): number | string {
    return medico.id ?? medico.crm;
  }
}
