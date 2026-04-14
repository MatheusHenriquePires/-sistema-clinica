import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ConsultaService } from '../services/consulta.service';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';
import { getApiErrorMessage } from '../shared/api-error.util';
import { DashboardStats } from '../shared/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly pacienteService = inject(PacienteService);
  private readonly medicoService = inject(MedicoService);
  private readonly consultaService = inject(ConsultaService);

  protected isLoading = true;
  protected errorMessage = '';
  protected stats: DashboardStats = {
    pacientes: 0,
    medicos: 0,
    consultas: 0,
  };

  ngOnInit(): void {
    this.loadStats();
  }

  protected loadStats(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      pacientes: this.pacienteService.listar(),
      medicos: this.medicoService.listar(),
      consultas: this.consultaService.listar(),
    }).subscribe({
      next: ({ pacientes, medicos, consultas }) => {
        this.stats = {
          pacientes: pacientes.length,
          medicos: medicos.length,
          consultas: consultas.length,
        };
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = getApiErrorMessage(
          error,
          'Não foi possível carregar o dashboard.',
        );
        this.isLoading = false;
      },
    });
  }
}
