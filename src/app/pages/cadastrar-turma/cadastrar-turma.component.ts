import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrosAPIResponse } from 'src/app/dtos/errors-response';
import { Turma } from 'src/app/dtos/turma';
import { TurmaCadastrar } from 'src/app/dtos/turma-cadastrar';
import { ErrosAPI } from 'src/app/interfaces';
import { TurmasService } from 'src/app/services/turmas.service';
import { ItemFeedbackComponent } from "../../components/item-feedback/item-feedback.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastrar-turma',
  imports: [
    CommonModule,
    ItemFeedbackComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './cadastrar-turma.component.html',
  styleUrl: './cadastrar-turma.component.scss'
})
export class CadastrarTurmaComponent {

  private readonly msgSuccessTemplate: string = 'Turma $1 ($2) cadastrada com sucesso!';

  msgSuccess!: string;
  criarTurma: TurmaCadastrar = new TurmaCadastrar(0, 0);
  turma!: Turma;
  apiErrors = new ErrosAPIResponse({});

  form: FormGroup = this.fb.group({
    numero_turma: ['', [Validators.required, Validators.min(1)]],
    ano_letivo: ['', [Validators.required, Validators.min(1900), Validators.max(2399)]],
  });

  constructor(
    private turmasService: TurmasService, 
    private fb: FormBuilder
  ) { }
  
  cadastrarTurmaSubmit() {
    const turmaRequest = {...this.form.value} as TurmaCadastrar;
    
    this.apiErrors = new ErrosAPIResponse({});  
    this.msgSuccess = '';

    this.turmasService.cadastrarTurma(turmaRequest).subscribe({
      next: (res) => {
        this.turma = {...res} as Turma;

        this.msgSuccess = this.msgSuccessTemplate
          .replace('$1', turmaRequest.numero_turma.toString())
          .replace('$2', turmaRequest.ano_letivo.toString());

        this.form.reset();
        // console.log('Turma cadastrada:', this.turma);
      },
      error: (err) => {
        if (err.status === 400 && err.error) {
          const errors = err.error.erros as ErrosAPI;
          this.apiErrors = new ErrosAPIResponse(errors);
          return;
        }

        if (err.status === 500) {
          alert('Erro ao cadastrar turma');
          return;
        }
      }
    })
  }
}
