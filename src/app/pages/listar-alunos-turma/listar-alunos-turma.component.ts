import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlunoResponse } from 'src/app/dtos/aluno-response';
import { Turma } from 'src/app/dtos/turma';
import { AlunosService } from 'src/app/services/alunos.service';
import { TurmasService } from 'src/app/services/turmas.service';
import { CpfMaskPipe } from "../../utilities/text/cpf-mask.pipe";

@Component({
  selector: 'app-listar-alunos-turma',
  imports: [
    CommonModule,
    RouterModule,
    CpfMaskPipe
],
  templateUrl: './listar-alunos-turma.component.html',
  styleUrl: './listar-alunos-turma.component.scss'
})
export class ListarAlunosTurmaComponent implements OnInit {

  alunos: AlunoResponse[] = [];
  turma!: Turma;

  constructor(
    private route: ActivatedRoute,
    private turmasService: TurmasService,
    private alunoService: AlunosService
  ) { }

  ngOnInit(): void {
    const turmaId = this.route.snapshot.paramMap.get('turmaId');
    if(!turmaId) {
      alert('Erro ao carregar turma');
      console.error('Rota sem turmaId');
      return;
    }

    Promise.all([
      this.#carregarTurma(turmaId),
      this.#carregarAlunos(turmaId)
    ]);

  }

  #carregarAlunos(turmaId: string) {
    this.alunoService.todosAlunosDaTurma(turmaId).subscribe({
      next: (res) => {
        this.alunos = [...res] as AlunoResponse[];

        console.log('Alunos carregados:', this.alunos);
      },
      error: (err) => {
        if (err.status === 500) {
          alert('Erro ao carregar alunos');
          return;
        }
      }
    });
  }

  #carregarTurma(turmaId: string) {
    this.turmasService.obterTurma(turmaId).subscribe({
      next: (res) => {
        this.turma = {...res} as Turma;

        console.log('Turma carregada:', this.turma);
      },
      error: (err) => {
        if (err.status === 500) {
          alert('Erro ao carregar turma');
          return;
        }
      }
    });
  }

}
