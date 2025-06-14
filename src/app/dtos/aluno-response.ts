import { TurmaMatriculada } from "./turma-matriculada";

export class AlunoResponse {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  turmas_matriculadas: TurmaMatriculada[] = [];

  constructor(
    id: string,
    nome: string,
    email: string,
    cpf: string,
    turmas_matriculadas: TurmaMatriculada[]
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.turmas_matriculadas = turmas_matriculadas;
  }
}