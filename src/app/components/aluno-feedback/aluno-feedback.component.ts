import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ErrosAPIResponse } from 'src/app/dtos/errors-response';

@Component({
  selector: 'app-aluno-feedback',
  imports: [
    CommonModule
  ],
  templateUrl: './aluno-feedback.component.html',
  styleUrl: './aluno-feedback.component.scss'
})
export class AlunoFeedbackComponent {
  @Input() apiErrors = new ErrosAPIResponse({});
  @Input() successMsg: string = '';
}
