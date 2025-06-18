import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverDirective } from '@coreui/angular';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ErrosAPI } from 'src/app/interfaces';
import { environment as env } from '../../../environments/environment';
import { ModalExclusaoItemComponent } from "../../components/modal-exclusao-item/modal-exclusao-item.component";
import { PaginateComponent } from "../../components/paginate/paginate.component";
import { AlunoResponse } from '../../dtos/aluno-response';
import { PaginatedResponse } from '../../dtos/pagination-response';
import { AlunosService } from '../../services/alunos.service';
import { CpfMaskPipe } from '../../utilities/text/cpf-mask.pipe';

@Component({
  selector: 'app-listar-alunos',
  imports: [
    CommonModule,
    CpfMaskPipe,
    RouterModule,
    ModalExclusaoItemComponent,
    PaginateComponent,
    PopoverDirective,
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
  templateUrl: './listar-alunos.component.html',
  styleUrl: './listar-alunos.component.scss'
})
export class ListarAlunosComponent implements OnInit {
  
  @ViewChild(ModalExclusaoItemComponent) modal?: ModalExclusaoItemComponent;

  paginate: PaginatedResponse<AlunoResponse> = new PaginatedResponse<any>(
      1, env.paginationSizeDefault, 0, 0, 0, []
  );

  animatingIds: Set<string> = new Set();
  alunoExclusao!: AlunoResponse | null;

  constructor(private alunoService: AlunosService){}

  ngOnInit(): void {
    this.carregarAlunos();
  }
  
  carregarAlunos(page: number = this.paginate.page, size: number = this.paginate.size): void {
    const self = this;

    this.alunoService.listarAlunos(page, size).subscribe({
      next: (res) => {
        self.paginate = {...res};
      },
      error: (err) => {
        alert('Erro ao carregar alunos');
        console.error('Erro ao carregar alunos', err);
      }
    });
  }

  openDeleteModal(aluno: AlunoResponse) {
    this.alunoExclusao = aluno;
    this.modal?.show();
  }

  confirmarExclusao = () => {
    if (this.alunoExclusao) {
      this.excluirAlunoSubmit(this.alunoExclusao).subscribe({
        complete: () => {
          this.modal?.hide();
        },
        error: (err) => {
          this.modal?.hide();
          const httpError = err as HttpErrorResponse;
          
          if (err.status === 400) {
            const errors = httpError.error.erros as ErrosAPI;
            
            let message = '';
            for (const [key, error] of Object.entries(errors)) {
              message += `${key}: ${error}\n`;
            }
            alert(`Erro ao excluir aluno\n${message}`);
          }
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

        if(this.paginate.length <= 1) {
          this.carregarAlunos(this.paginate.page-1);
        } else {
          this.carregarAlunos()
        }

      }, env.animationDeleteItemTime);
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
