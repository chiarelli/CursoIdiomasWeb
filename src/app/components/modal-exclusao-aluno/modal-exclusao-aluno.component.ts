import { Component, ViewChild, Input } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { AlunoResponse } from 'src/app/dtos/aluno-response';

@Component({
  selector: 'app-modal-exclusao-aluno',
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
  templateUrl: './modal-exclusao-aluno.component.html',
  styleUrl: './modal-exclusao-aluno.component.scss'
})
export class ModalExclusaoAlunoComponent {

  @Input() confirmCallback: (() => void) = () => {};
  
  isVisible: boolean = false;
  aluno: AlunoResponse = new AlunoResponse('', '', '', '', []);

  show(aluno: AlunoResponse): void {
    this.aluno = aluno;
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }

}
