import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servico } from '../model/servico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private apiUrl = 'http://localhost:8080/api/v1/servicos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl);
  }

  getById(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.apiUrl}/${id}`);
  }

  save(servico: Servico): Observable<Servico> {
    if (servico.id) {
      return this.http.put<Servico>(`${this.apiUrl}/${servico.id}`, servico);
    }
    return this.http.post<Servico>(this.apiUrl, servico);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}