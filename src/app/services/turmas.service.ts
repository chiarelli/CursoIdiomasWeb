import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../dtos/pagination-response';
import { Turma } from '../dtos/turma';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  constructor(private ngHttp: HttpClient) { }

  listarTurmas(page: number = 1, size: number = 20): Observable<PaginatedResponse<Turma>> {
    const url = `${env.baseUrl}/turmas?page=${page}&size=${size}`;
    return this.ngHttp.get<PaginatedResponse<Turma>>(url);
  }
}
