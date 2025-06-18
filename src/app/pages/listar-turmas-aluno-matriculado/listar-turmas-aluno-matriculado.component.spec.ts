import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTurmasAlunoMatriculadoComponent } from './listar-turmas-aluno-matriculado.component';

describe('ListarTurmasAlunoMatriculadoComponent', () => {
  let component: ListarTurmasAlunoMatriculadoComponent;
  let fixture: ComponentFixture<ListarTurmasAlunoMatriculadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTurmasAlunoMatriculadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTurmasAlunoMatriculadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
