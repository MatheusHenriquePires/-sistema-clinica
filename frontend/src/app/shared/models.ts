export interface LoginPayload {
  email: string;
  senha: string;
}

export interface RegisterPayload {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export interface Paciente {
  id?: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

export interface Medico {
  id?: number;
  nome: string;
  crm: string;
  especialidade: string;
  email: string;
}

export interface Consulta {
  id?: number;
  pacienteId: number;
  medicoId: number;
  dataHora: string;
  motivo: string;
}

export interface DashboardStats {
  pacientes: number;
  medicos: number;
  consultas: number;
}
