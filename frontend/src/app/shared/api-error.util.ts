import { HttpErrorResponse } from '@angular/common/http';

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Não foi possível concluir a operação.',
): string {
  if (!(error instanceof HttpErrorResponse)) {
    return fallback;
  }

  if (error.status === 0) {
    return 'Não foi possível conectar à API em http://localhost:8080.';
  }

  if (typeof error.error === 'string' && error.error.trim()) {
    return error.error;
  }

  if (error.error?.message) {
    return error.error.message;
  }

  if (error.error?.mensagem) {
    return error.error.mensagem;
  }

  if (error.error?.detalhes) {
    return error.error.detalhes;
  }

  if (error.status === 401) {
    return 'Sessão inválida ou expirada. Faça login novamente.';
  }

  return error.message || fallback;
}
