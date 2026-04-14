import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Consulta } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/consultas`;

  listar(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  criar(payload: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, payload);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
