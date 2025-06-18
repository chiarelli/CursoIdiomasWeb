import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrosAPIResponse } from 'src/app/dtos/errors-response';
import { Turma } from 'src/app/dtos/turma';
import { TurmaEditar } from 'src/app/dtos/turma -editar';
import { ErrosAPI } from 'src/app/interfaces';
import { TurmasService } from 'src/app/services/turmas.service';
import { ItemFeedbackComponent } from "../../components/item-feedback/item-feedback.component";

@Component({
  selector: 'app-editar-turma',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemFeedbackComponent
],
  templateUrl: './editar-turma.component.html',
  styleUrl: './editar-turma.component.scss'
})
export class EditarTurmaComponent implements OnInit {

  private readonly msgSuccessTemplate: string = 'Turma $1 ($2) editada com sucesso!';

  form!: FormGroup;
  turma!: Turma
  apiErrors: ErrosAPIResponse = new ErrosAPIResponse({});
  msgSuccess: string = '';

  constructor(
    private turmasService: TurmasService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      numero_turma: ['', [Validators.required, Validators.min(1)]],
      ano_letivo: ['', [Validators.required, Validators.min(1900), Validators.max(2399)]],
    });
  }
  
  ngOnInit(): void {
    const guid = this.route.snapshot.paramMap.get('id');

    if(!guid) {
      alert('Erro ao carregar turma');
      console.error('Rota sem guid');
      return;
    }
    this.carregarTurma(guid);
  }

  carregarTurma(guid: string): void {

    this.turmasService.obterTurma(guid).subscribe({
      next: (res) => {
        const turma = res as Turma;
        this.turma = {...turma};
        // console.log('Turma carregada:', this.turma);
        this.form.patchValue({
          numero_turma: turma.numero_turma,
          ano_letivo: turma.ano_letivo
        });
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
    });

  }

  editarTurmaSubmit() {
    this.msgSuccess = '';
    this.apiErrors = new ErrosAPIResponse({});
    const turmaRequest = {...this.form.value} as TurmaEditar;
    // console.log('Turma a ser editada:', this.turma);
    this.turmasService.editarTurma(this.turma.id, turmaRequest).subscribe({
      next: (res) => {
        this.msgSuccess = this.msgSuccessTemplate
          .replace('$1', turmaRequest.numero_turma.toString())
          .replace('$2', turmaRequest.ano_letivo.toString());
      },
      error: (err) => {
        if (err.status === 400 && err.error) {
          const errors = err.error.erros as ErrosAPI;
          this.apiErrors = new ErrosAPIResponse(errors);
          return;
        }

        if (err.status === 500) {
          alert('Erro ao editar turma');
          return;
        }
      }
    });
  }

}
