import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoFormComponent } from 'src/app/components/aluno-form/aluno-form.component';
import { ErrosAPIResponse } from 'src/app/dtos/errors-response';
import { ErrosAPI } from 'src/app/interfaces';
import { minSelectedItems } from 'src/app/validators/min-selected-items';
import { CadastrarAluno } from '../../dtos/cadastrar-aluno';
import { PaginatedResponse } from '../../dtos/pagination-response';
import { TurmasService } from '../../services/turmas.service';
import { cpfValidator } from '../../validators/cpf-validator';
import { AlunoResponse } from './../../dtos/aluno-response';
import { Turma } from './../../dtos/turma';
import { AlunosService } from './../../services/alunos.service';

@Component({
  selector: 'app-cadastrar-aluno',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlunoFormComponent
  ],
  templateUrl: './cadastrar-aluno.component.html',
  styleUrl: './cadastrar-aluno.component.scss'
})
export class CadastrarAlunoComponent implements OnInit {

  criarAluno: CadastrarAluno = new CadastrarAluno('', '', '', []);
  alunoCriado: AlunoResponse = new AlunoResponse('', '', '', '', []);
  turmas: PaginatedResponse<Turma> = new PaginatedResponse<Turma>(1, 0, 0, 0, 0, []);
  form: FormGroup;
  apiErrors: ErrosAPIResponse = new ErrosAPIResponse({});

  constructor(  
    private alunoService: AlunosService,
    private turmasService: TurmasService,
    private fb: FormBuilder,    
  ) { 
    this.alunoService = alunoService;
    this.turmasService = turmasService;
    this.fb = fb;

    this.form = this.fb.group({
      nome: ['',[Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, cpfValidator]],
      turma_matricular_ids: ['', [minSelectedItems(1)]],
    });

  }
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

    this.alunoService.cadastrarAluno(payload).subscribe({
      next: (res) => {
        const aluno = res as AlunoResponse;
        self.alunoCriado = {...aluno};
        this.form.reset();  
        this.apiErrors = new ErrosAPIResponse({});      
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

        this.apiErrors = new ErrosAPIResponse({});  
      }
    });
  }

}
