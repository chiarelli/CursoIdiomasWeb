import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlunoFormComponent } from 'src/app/components/aluno-form/aluno-form.component';
import { ErrosAPIResponse } from 'src/app/dtos/errors-response';
import { ErrosAPI } from 'src/app/interfaces';
import { CadastrarAluno } from '../../dtos/cadastrar-aluno';
import { PaginatedResponse } from '../../dtos/pagination-response';
import { TurmasService } from '../../services/turmas.service';
import { AlunoResponse } from './../../dtos/aluno-response';
import { Turma } from './../../dtos/turma';
import { AlunosService } from './../../services/alunos.service';

@Component({
  selector: 'app-cadastrar-aluno',
  imports: [
    CommonModule,
    AlunoFormComponent,
  ],
  templateUrl: './cadastrar-aluno.component.html',
  styleUrl: './cadastrar-aluno.component.scss'
})
export class CadastrarAlunoComponent implements OnInit {
  
  private readonly msgSuccessTemplate: string = 'Aluno %s cadastrado com sucesso!';

  criarAluno: CadastrarAluno = new CadastrarAluno('', '', '', []);
  alunoCriado: AlunoResponse = new AlunoResponse('', '', '', '', []);
  turmas: PaginatedResponse<Turma> = new PaginatedResponse<Turma>(1, 0, 0, 0, 0, []);
  apiErrors: ErrosAPIResponse = new ErrosAPIResponse({});
  msgSuccess!: string;
  resetFormTrigger = false;

  constructor(  
    private alunoService: AlunosService,
    private turmasService: TurmasService,
  ) { }
  ngOnInit(): void {
    this.turmasService.listarTurmas().subscribe({
      next: (res) => {
        const turmas = res as PaginatedResponse<Turma>;
        this.turmas = {...turmas};
      },
      error: (err) => {
        console.error('Erro ao carregar turmas', err);
      }
    })
  }

  CadastrarAlunoSubmit(payload: any) {
    const self = this;

    this.apiErrors = new ErrosAPIResponse({});  
    this.msgSuccess = '';

    this.alunoService.cadastrarAluno(payload).subscribe({
      next: (res) => {
        const aluno = res as AlunoResponse;
        self.alunoCriado = {...aluno};
        
        this.resetFormTrigger = true;
        setTimeout(() => this.resetFormTrigger = false);

        this.msgSuccess = this.msgSuccessTemplate.replace('%s', this.alunoCriado.nome);
      },
      error: (err) => {
        
        if (err.status === 400 && err.error) {
          const errors = err.error.erros as ErrosAPI;
          this.apiErrors = new ErrosAPIResponse(errors);
          return;
        }

        if (err.status === 500) {
          alert('Erro ao cadastrar aluno');
          return;
        }
        
      }
    });
  }

}
