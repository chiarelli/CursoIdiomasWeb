import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AlunoResponse } from 'src/app/dtos/aluno-response';
import { CadastrarAluno } from 'src/app/dtos/cadastrar-aluno';
import { ErrosAPIResponse } from 'src/app/dtos/errors-response';
import { Turma } from 'src/app/dtos/turma';
import { cpfValidator } from 'src/app/validators/cpf-validator';
import { minSelectedItems } from 'src/app/validators/min-selected-items';
import { ItemFeedbackComponent } from "../item-feedback/item-feedback.component";
import { FormControlDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aluno-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    ItemFeedbackComponent,
    FormControlDirective,
    RouterLink
],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent implements OnInit {
  @Input() resetTrigger: boolean = false;
  @Input() initialData?: AlunoResponse;
  @Input() turmas: Turma[] = [];
  @Input() apiErrors!: ErrosAPIResponse;
  @Input() successMsg!: string;
  @Input() alunoCriado!: AlunoResponse;
  
  @Output() onSubmit = new EventEmitter<CadastrarAluno>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['',[Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, cpfValidator]],
      turma_matricular_ids: ['', [minSelectedItems(1)]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetTrigger'] && changes['resetTrigger'].currentValue === true) {
      this.form.reset();
    }
  }

}
