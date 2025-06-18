import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PopoverDirective } from '@coreui/angular';
import { AlunoResponse } from 'src/app/dtos/aluno-response';
import { Turma } from 'src/app/dtos/turma';
import { AlunosService } from 'src/app/services/alunos.service';
import { TurmasService } from 'src/app/services/turmas.service';
import { environment as env } from 'src/environments/environment';
import { CpfMaskPipe } from "../../utilities/text/cpf-mask.pipe";
import { DesmatricularAlunoComponent } from "../desmatricular-aluno/desmatricular-aluno.component";

@Component({
  selector: 'app-listar-alunos-turma',
  imports: [
    CommonModule,
    RouterModule,
    CpfMaskPipe,
    DesmatricularAlunoComponent,
    PopoverDirective
],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, height: '0px', overflow: 'hidden', padding: '0' })),
      transition('visible => hidden', [
        animate(`${env.animationDeleteItemTime}ms ease-out`)
      ])
    ])
  ],
  templateUrl: './listar-alunos-turma.component.html',
  styleUrl: './listar-alunos-turma.component.scss'
})
export class ListarAlunosTurmaComponent implements OnInit {

  @ViewChild(DesmatricularAlunoComponent) desmatricularAction?: DesmatricularAlunoComponent
  animatingIds: Set<string> = new Set();

  alunos: AlunoResponse[] = [];
  turma = {} as Turma;

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

  alunoDesmatriculado = (turma: Turma, aluno: AlunoResponse): void => {
    this.animatingIds.add(aluno.id);

    setTimeout(() => {
      this.alunos = this.alunos.filter(a => a.id !== aluno.id);
      this.animatingIds.delete(aluno.id);
    }, env.animationDeleteItemTime);

  }

  openDesmatricularModal(aluno: AlunoResponse) {
    this.desmatricularAction?.execute(aluno, this.turma);
  }

  #carregarAlunos(turmaId: string) {
    this.alunoService.todosAlunosDaTurma(turmaId).subscribe({
      next: (res) => {
        this.alunos = [...res] as AlunoResponse[];
        // console.log('Alunos carregados:', this.alunos);
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
        // console.log('Turma carregada:', this.turma);
      },
      error: (err) => {
        if (err.status === 500) {
          alert('Erro ao carregar turma');
          return;
        }
      }
    });
  }

  getState(turmaId: string): 'visible' | 'hidden' {
    return this.animatingIds.has(turmaId) ? 'hidden' : 'visible';
  }

}
