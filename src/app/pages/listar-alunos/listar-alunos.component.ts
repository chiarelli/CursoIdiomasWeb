import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { AlunoResponse } from '../../dtos/aluno-response';
import { PaginatedResponse } from '../../dtos/pagination-response';
import { AlunosService } from '../../services/alunos.service';
import { CpfMaskPipe } from '../../utilities/text/cpf-mask.pipe';

@Component({
  selector: 'app-listar-alunos',
  imports: [
    CommonModule,
    CpfMaskPipe
  ],
  templateUrl: './listar-alunos.component.html',
  styleUrl: './listar-alunos.component.scss'
})
export class ListarAlunosComponent implements OnInit {
  
  paginate: PaginatedResponse<AlunoResponse> = new PaginatedResponse<any>(
        1, env.paginationSizeDefault, 0, 0, 0, []
  );

  constructor(private alunoService: AlunosService){}

  ngOnInit(): void {
    this.carregarAlunos();
  }
  
  carregarAlunos(): void {
    const self = this;

    this.alunoService.listarAlunos(this.paginate.page, this.paginate.size).subscribe({
      next: (res) => {
        self.paginate = {...res};
        
        console.log(self.paginate);
      },
      error: (err) => {
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
  
}
