import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShellComponent } from './layout/shell.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PacientesComponent } from './pacientes/pacientes.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'consultas', component: ConsultasComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
