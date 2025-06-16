export class CadastrarAluno {
  nome: string;
  email: string;
  cpf: string;
  turma_matricular_ids: string[];

  constructor(
    nome: string,
    email: string,
    cpf: string,
    turma_matricular_ids: string[]
  ) {
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.turma_matricular_ids = turma_matricular_ids;
  }
}