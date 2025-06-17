import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalExclusaoItemComponent } from 'src/app/components/modal-exclusao-item/modal-exclusao-item.component';
import { PaginatedResponse } from 'src/app/dtos/pagination-response';
import { Turma } from 'src/app/dtos/turma';
import { TurmasService } from 'src/app/services/turmas.service';
import { environment as env } from 'src/environments/environment';
import { PaginateComponent } from "../../components/paginate/paginate.component";

@Component({
  selector: 'app-listar-turmas',
  imports: [
    CommonModule,
    PaginateComponent,
    RouterModule,
    ModalExclusaoItemComponent
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
  templateUrl: './listar-turmas.component.html',
  styleUrl: './listar-turmas.component.scss'
})
export class ListarTurmasComponent implements OnInit {

  @ViewChild(ModalExclusaoItemComponent) modal?: ModalExclusaoItemComponent;

  paginate = new PaginatedResponse<Turma>(
      1, env.paginationSizeDefault, 0, 0, 0, []
  );

  turmaExclusao!: Turma | null;
  animatingIds: Set<string> = new Set();

  constructor(private turmasService: TurmasService) { }

  ngOnInit(): void {
    this.carregarTurmas();
  }

  carregarTurmas(page: number = this.paginate.page, size: number = this.paginate.size): void {
    this.turmasService.listarTurmas(page, size).subscribe({
      next: (res) => {
        this.paginate = {...res};
      },
      error: (err) => {
        alert('Erro ao carregar turmas');
        console.error('Erro ao carregar turmas', err);
      }
    })
  }

  openDeleteModal(turma: Turma): void {
    this.turmaExclusao = turma;
    console.log('Turma selecionada para exclusão:', this.turmaExclusao);
    this.modal?.show();
  }

  confirmarExcluirTurma = () => {
    if (!this.turmaExclusao) {
      alert('Nenhuma turma selecionada para exclusão');
      console.error('Nenhuma turma selecionada para exclusão');
      return;
    }
    this.excluirTurmaSubmit(this.turmaExclusao);
  }

  excluirTurmaSubmit(turma: Turma): void {
    this.turmasService.excluirTurma(turma.id).subscribe({
      next: () => {
        this.modal?.hide();

        this.animatingIds.add(turma.id);
        this.turmaExclusao = null;

        setTimeout(() => {
          this.paginate.content = this.paginate.content.filter(item => item.id !== turma.id);
          this.animatingIds.delete(turma.id);

          if(this.paginate.length <= 1) {
            this.carregarTurmas(this.paginate.page-1);
          } else {
            this.carregarTurmas()
          }
        }, env.animationDeleteItemTime);

      }
      ,
      error: (err) => {
        alert('Erro ao excluir turma');
        console.error('Erro ao excluir turma', err);
      }
    });
  }

  getState(id: string): 'visible' | 'hidden' {
    return this.animatingIds.has(id) ? 'hidden' : 'visible';
  }
  
}
