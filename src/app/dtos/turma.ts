import { AlunoMatriculado } from "./aluno-matriculado";

export class Turma {
  id: string;
  numero_turma: number;
  ano_letivo: number;
  alunos_matriculados: AlunoMatriculado[] = [];

  constructor(
    id: string,
    numero_turma: number,
    ano_letivo: number,
    alunos_matriculados: AlunoMatriculado[]
  ) {
    this.id = id;
    this.numero_turma = numero_turma;
    this.ano_letivo = ano_letivo;
    this.alunos_matriculados = alunos_matriculados;
  }
}