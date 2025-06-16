import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AlunoResponse } from 'src/app/dtos/aluno-response';
import { CadastrarAluno } from 'src/app/dtos/cadastrar-aluno';
import { Turma } from 'src/app/dtos/turma';
import { cpfValidator } from 'src/app/validators/cpf-validator';
import { minSelectedItems } from 'src/app/validators/min-selected-items';
import { PaginatedResponse } from './../../dtos/pagination-response';

@Component({
  selector: 'app-aluno-form',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    NgxMaskDirective
  ],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent implements OnInit {
  @Input() initialData?: AlunoResponse;
  @Input() turmas = new PaginatedResponse<Turma>(0, 0, 0, 0, 0, []);
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

}
