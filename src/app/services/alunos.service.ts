import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { AlunoResponse } from '../dtos/aluno-response';
import { PaginatedResponse as PaginationResponse } from '../dtos/pagination-response';
import { CadastrarAluno } from '../dtos/cadastrar-aluno';
import { AlunoEditarRequest } from '../dtos/aluno-editar';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor(private ngHttp: HttpClient) { }

  listarAlunos(page: number = 1, size: number = 20): Observable<PaginationResponse<AlunoResponse>> {
    const url = `${env.baseUrl}/alunos?page=${page}&size=${size}`;
    return this.ngHttp.get<PaginationResponse<AlunoResponse>>(url);
  }

  cadastrarAluno(aluno: CadastrarAluno): Observable<AlunoResponse> {
    return this.ngHttp.post<AlunoResponse>(`${env.baseUrl}/alunos`, aluno);
  }

  editarAluno(guid: string, aluno: AlunoEditarRequest): Observable<AlunoResponse> {
    return this.ngHttp.put<AlunoResponse>(`${env.baseUrl}/alunos/${guid}`, aluno);
  }

  pegarAlunoPorGuid(guid: string): Observable<AlunoResponse> {
    return this.ngHttp.get<AlunoResponse>(`${env.baseUrl}/alunos/${guid}`);
  }
  
}
