import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  constructor(private ngHttp: HttpClient) { }

  desmatricularAluno(turmaId: string, alunoId: string): Observable<void> {
    const url = `${env.baseUrl}/secretaria/desmatricular/turma/${turmaId}/aluno/${alunoId}`;
    return this.ngHttp.delete<void>(url);
  }
}