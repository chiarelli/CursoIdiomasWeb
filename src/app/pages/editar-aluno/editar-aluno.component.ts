import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { ItemFeedbackComponent } from 'src/app/components/item-feedback/item-feedback.component';
import { AlunoResponse, AlunoResponseNull } from 'src/app/dtos/aluno-response';
import { ErrosAPIResponse } from 'src/app/dtos/errors-response';
import { Turma } from 'src/app/dtos/turma';
import { ErrosAPI } from 'src/app/interfaces';
import { AlunosService } from 'src/app/services/alunos.service';
import { TurmasService } from 'src/app/services/turmas.service';

@Component({
  selector: 'app-editar-aluno',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemFeedbackComponent,
    NgxMaskPipe
  ],
  templateUrl: './editar-aluno.component.html',
  styleUrl: './editar-aluno.component.scss'
})
export class EditarAlunoComponent implements OnInit {
  
  private readonly msgSuccessTemplate: string = 'Aluno %s editado com sucesso!';
  
  turmas: Turma[] = [];
  apiErrors: ErrosAPIResponse = new ErrosAPIResponse({});
  msgSuccess: string = '';
  form!: FormGroup;
  alunoEditar = new AlunoResponseNull();

  constructor(
    private alunoService: AlunosService,
    private turmasService: TurmasService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  ngOnInit(): void {
    const self = this;
    const guid = this.route.snapshot.paramMap.get('id');

    if(!guid) {
      alert('Erro ao carregar aluno');
      console.error('Rota sem guid');
      return;
    }

    Promise.all([
      this.carregarAluno(guid),
      this.carregarTurmasDoAluno(guid)
    ]).then(([aluno]) => {

      self.form.patchValue({
        nome: aluno.nome,
        email: aluno.email
      });    

    })
  }

  async carregarAluno(guid: string): Promise<AlunoResponse> {
    const self = this;

    return new Promise((resolve, reject) => {

      this.alunoService.pegarAlunoPorGuid(guid).subscribe({
        next: (res) => {
          const aluno = res as AlunoResponse;
          self.alunoEditar = {...aluno};
          resolve(self.alunoEditar);
        },
        error: (err) => {
          console.error('Erro ao carregar aluno', err);
          reject(err);
        }
      })

    });
  }

  async carregarTurmasDoAluno(alunoId: string): Promise<Turma[]> {
    const self = this;

    return new Promise((resolve, reject) => {

      this.turmasService.turmasAlunoMatriculado(alunoId).subscribe({
        next: (res) => {
          const turmas = res as Turma[];
          self.turmas = Array.from(turmas);
          resolve(self.turmas);
        },
        error: (err) => {
          console.error('Erro ao carregar turmas', err);
          reject(err);
        }
      })

    });

  }

  editarAlunoSubmit() {
    const payload = this.form.value

    this.apiErrors = new ErrosAPIResponse({});  
    this.msgSuccess = '';

    this.alunoService.editarAluno(this.alunoEditar.id, payload).subscribe({
      next: (res) => {
        const aluno = res as AlunoResponse;

        this.msgSuccess = this.msgSuccessTemplate.replace('%s', aluno.nome);
      },
      error: (err) => {
        if (err.status === 400 && err.error) {
          const errors = err.error.erros as ErrosAPI;
          this.apiErrors = new ErrosAPIResponse(errors);
          return;
        }

        if (err.status === 500) {
          alert('Erro ao editar aluno');
          return;
        }
      }
    });
  }

}
