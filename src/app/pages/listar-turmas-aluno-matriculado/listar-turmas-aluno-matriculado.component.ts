import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AlunoResponse } from 'src/app/dtos/aluno-response';
import { Turma } from 'src/app/dtos/turma';
import { AlunosService } from 'src/app/services/alunos.service';
import { TurmasService } from 'src/app/services/turmas.service';
import { environment as env } from 'src/environments/environment';
import { CpfMaskPipe } from "../../utilities/text/cpf-mask.pipe";
import { DesmatricularAlunoComponent } from '../desmatricular-aluno/desmatricular-aluno.component';

@Component({
  selector: 'app-listar-turmas-aluno-matriculado',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    CpfMaskPipe,
    DesmatricularAlunoComponent
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
  templateUrl: './listar-turmas-aluno-matriculado.component.html',
  styleUrl: './listar-turmas-aluno-matriculado.component.scss'
})
export class ListarTurmasAlunoMatriculadoComponent implements OnInit {

  @ViewChild(DesmatricularAlunoComponent) desmatricularAction?: DesmatricularAlunoComponent

  turmas: Turma[] = [];
  aluno = {} as AlunoResponse;
  animatingIds: Set<string> = new Set();

  constructor(
    private route: ActivatedRoute,
    private turmasService: TurmasService,
    private alunoService: AlunosService
  ) { }
  
  ngOnInit(): void {
    const alunoId = this.route.snapshot.paramMap.get('aluno_id');
    if(!alunoId) {
      alert('Erro ao carregar turmas');
      console.error('Rota sem aluno_id');
      return;
    }

    Promise.all([
      this.#carregarAluno(alunoId),
      this.#carregarTurmas(alunoId)
    ]);
    
  }

  async #carregarAluno(alunoId: string): Promise<void> {
    this.alunoService.pegarAlunoPorGuid(alunoId).subscribe({
      next: (res) => {
        this.aluno = {...res} as AlunoResponse;

        console.log('Aluno carregado:', this.aluno);
      },
      error: (err) => {
        console.error('Erro ao carregar aluno', err);
      }
    })

  }

  async #carregarTurmas(alunoId: string): Promise<void> {
    this.turmasService.turmasAlunoMatriculado(alunoId).subscribe({
      next: (res) => {
        const turmas = res as Turma[];
        this.turmas = Array.from(turmas);

        console.log('Turmas carregadas:', this.turmas);
      },
      error: (err) => {
        console.error('Erro ao carregar turmas', err);
      }
    })
  }

  openDesmatricularModal(turma: Turma) {
    this.desmatricularAction?.execute(this.aluno, turma);
  }

  alunoDesmatriculado = (turma: Turma, aluno: AlunoResponse): void => {
    this.animatingIds.add(turma.id);
    
    setTimeout(() => {
      this.turmas = this.turmas.filter(t => t.id !== turma.id);
      this.animatingIds.delete(turma.id);
    }, env.animationDeleteItemTime);
  }

  getState(id: string): 'visible' | 'hidden' {
    return this.animatingIds.has(id) ? 'hidden' : 'visible';
  }

}
