import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ModalExclusaoAlunoComponent } from "../../components/modal-exclusao-aluno/modal-exclusao-aluno.component";
import { AlunoResponse } from '../../dtos/aluno-response';
import { PaginatedResponse } from '../../dtos/pagination-response';
import { AlunosService } from '../../services/alunos.service';
import { CpfMaskPipe } from '../../utilities/text/cpf-mask.pipe';

const animateTime = 500;

@Component({
  selector: 'app-listar-alunos',
  imports: [
    CommonModule,
    CpfMaskPipe,
    RouterModule,
    ModalExclusaoAlunoComponent
],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, height: '0px', overflow: 'hidden', padding: '0' })),
      transition('visible => hidden', [
        animate(`${animateTime}ms ease-out`)
      ])
    ])
  ],
  templateUrl: './listar-alunos.component.html',
  styleUrl: './listar-alunos.component.scss'
})
export class ListarAlunosComponent implements OnInit {
  
  @ViewChild(ModalExclusaoAlunoComponent) modal?: ModalExclusaoAlunoComponent;

  paginate: PaginatedResponse<AlunoResponse> = new PaginatedResponse<any>(
        1, env.paginationSizeDefault, 0, 0, 0, []
  );

  animatingIds: Set<string> = new Set();
  alunoExclusao!: AlunoResponse | null;

  constructor(private alunoService: AlunosService){}

  ngOnInit(): void {
    this.carregarAlunos();
  }
  
  carregarAlunos(): void {
    const self = this;

    this.alunoService.listarAlunos(this.paginate.page, this.paginate.size).subscribe({
      next: (res) => {
        self.paginate = {...res};
      },
      error: (err) => {
        alert('Erro ao carregar alunos');
        console.error('Erro ao carregar alunos', err);
      }
    });
  }

   paginaAnterior() {
    if (this.paginate.page > 1) {
      this.paginate.page--;
      this.carregarAlunos();
    }
  }

  proximaPagina() {
    if (this.paginate.page < this.paginate.total_pages) {
      this.paginate.page++;
      this.carregarAlunos();
    }
  }

  openDeleteModal(aluno: AlunoResponse) {
    this.alunoExclusao = aluno;
    this.modal?.show(aluno);
  }

  confirmarExclusao = () => {
    if (this.alunoExclusao) {
      this.excluirAlunoSubmit(this.alunoExclusao).subscribe({
        next: () => {
          this.modal?.hide();
        }
      });
    }
  }

  excluirAlunoSubmit(aluno: AlunoResponse): Observable<void> {
  return this.alunoService.excluirAluno(aluno.id).pipe(
    tap(() => {
      this.animatingIds.add(aluno.id);
      this.alunoExclusao = null;

      setTimeout(() => {
        this.paginate.content = this.paginate.content.filter(a => a.id !== aluno.id);
        this.animatingIds.delete(aluno.id);
      }, animateTime);
    }),
    catchError(err => {
      console.error('Erro ao excluir aluno', err);
      return throwError(() => err);
    }),
    map(() => void 0)
  );
}

  getState(id: string): 'visible' | 'hidden' {
    return this.animatingIds.has(id) ? 'hidden' : 'visible';
  }
  
}
