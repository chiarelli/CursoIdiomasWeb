import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    RouterModule
],
  templateUrl: './listar-turmas.component.html',
  styleUrl: './listar-turmas.component.scss'
})
export class ListarTurmasComponent implements OnInit {

  paginate = new PaginatedResponse<Turma>(
      1, env.paginationSizeDefault, 0, 0, 0, []
  );

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

  excluirTurma(turmaId: string): void {
   // TODO - implementar
  }
  
}
