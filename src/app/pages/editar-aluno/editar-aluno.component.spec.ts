import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlunoComponent } from './editar-aluno.component';

describe('EditarAlunoComponent', () => {
  let component: EditarAlunoComponent;
  let fixture: ComponentFixture<EditarAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
