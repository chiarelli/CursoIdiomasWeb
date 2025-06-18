import { Component, Input } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { AlunoResponse } from 'src/app/dtos/aluno-response';
import { Turma } from 'src/app/dtos/turma';
import { SecretariaService } from 'src/app/services/secretaria.service';

@Component({
  selector: 'app-desmatricular-aluno',
  imports: [
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent
  ],
  templateUrl: './desmatricular-aluno.component.html',
  styleUrl: './desmatricular-aluno.component.scss'
})
export class DesmatricularAlunoComponent {

  @Input() resultCallback = (turma: Turma, aluno: AlunoResponse): void => {};
  
  isVisible: boolean = false;

  aluno = {} as AlunoResponse;
  turma = {} as Turma;

  constructor(private secretariaService: SecretariaService) { }

  execute(aluno: AlunoResponse, turma: Turma) {
    // console.log("Executando desmatricular aluno");
    this.aluno = aluno;
    this.turma = turma;
    this.openModal();
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  desmatricularSubmit() {
    // console.log("Desmatricular aluno", this.aluno, this.turma);
    this.secretariaService.desmatricularAluno(this.turma.id, this.aluno.id).subscribe({
      next: () => {
        this.resultCallback(this.turma, this.aluno);
        this.closeModal();
      },
      error: (err) => {
        this.closeModal();
        alert('Erro ao desmatricular aluno');
      }
    });
  }

}
