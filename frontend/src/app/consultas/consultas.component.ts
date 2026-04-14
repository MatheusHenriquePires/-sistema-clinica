import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConsultaService } from '../services/consulta.service';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';
import { getApiErrorMessage } from '../shared/api-error.util';
import { Consulta, Medico, Paciente } from '../shared/models';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css',
})
export class ConsultasComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly consultaService = inject(ConsultaService);
  private readonly pacienteService = inject(PacienteService);
  private readonly medicoService = inject(MedicoService);

  protected consultas: Consulta[] = [];
  protected pacientes: Paciente[] = [];
  protected medicos: Medico[] = [];
  protected isLoading = true;
  protected isSaving = false;
  protected errorMessage = '';
  protected successMessage = '';

  protected readonly form = this.fb.nonNullable.group({
    pacienteId: [0, [Validators.required, Validators.min(1)]],
    medicoId: [0, [Validators.required, Validators.min(1)]],
    dataHora: ['', Validators.required],
    motivo: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      consultas: this.consultaService.listar(),
      pacientes: this.pacienteService.listar(),
      medicos: this.medicoService.listar(),
    }).subscribe({
      next: ({ consultas, pacientes, medicos }) => {
        this.consultas = consultas;
        this.pacientes = pacientes;
        this.medicos = medicos;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = getApiErrorMessage(
          error,
          'Não foi possível carregar as consultas.',
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

    this.consultaService
      .criar(this.form.getRawValue())
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.successMessage = 'Consulta agendada com sucesso.';
          this.form.reset({
            pacienteId: 0,
            medicoId: 0,
            dataHora: '',
            motivo: '',
          });
          this.loadData();
        },
        error: (error) => {
          this.errorMessage = getApiErrorMessage(
            error,
            'Não foi possível agendar a consulta.',
          );
        },
      });
  }

  protected cancelar(consulta: Consulta): void {
    if (!consulta.id) {
      return;
    }

    const confirmed = window.confirm('Deseja cancelar esta consulta?');
    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.consultaService.deletar(consulta.id).subscribe({
      next: () => {
        this.successMessage = 'Consulta cancelada com sucesso.';
        this.loadData();
      },
      error: (error) => {
        this.errorMessage = getApiErrorMessage(
          error,
          'Não foi possível cancelar a consulta.',
        );
      },
    });
  }

  protected pacienteNome(pacienteId: number): string {
    return (
      this.pacientes.find((paciente) => paciente.id === pacienteId)?.nome ??
      `#${pacienteId}`
    );
  }

  protected medicoNome(medicoId: number): string {
    return (
      this.medicos.find((medico) => medico.id === medicoId)?.nome ??
      `#${medicoId}`
    );
  }

  protected trackPaciente(_: number, paciente: Paciente): number | string {
    return paciente.id ?? paciente.cpf;
  }

  protected trackMedico(_: number, medico: Medico): number | string {
    return medico.id ?? medico.crm;
  }

  protected trackConsulta(index: number, consulta: Consulta): number {
    return consulta.id ?? index;
  }
}
