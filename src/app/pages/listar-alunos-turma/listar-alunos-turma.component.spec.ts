import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAlunosTurmaComponent } from './listar-alunos-turma.component';

describe('ListarAlunosTurmaComponent', () => {
  let component: ListarAlunosTurmaComponent;
  let fixture: ComponentFixture<ListarAlunosTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAlunosTurmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAlunosTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
