import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AlunoResponse } from 'src/app/dtos/aluno-response';
import { Turma } from 'src/app/dtos/turma';
import { AlunosService } from 'src/app/services/alunos.service';
import { TurmasService } from 'src/app/services/turmas.service';
import { CpfMaskPipe } from "../../utilities/text/cpf-mask.pipe";

@Component({
  selector: 'app-listar-turmas-aluno-matriculado',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    CpfMaskPipe
],
  templateUrl: './listar-turmas-aluno-matriculado.component.html',
  styleUrl: './listar-turmas-aluno-matriculado.component.scss'
})
export class ListarTurmasAlunoMatriculadoComponent implements OnInit {

  turmas: Turma[] = [];
  aluno!: AlunoResponse;

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

}
