import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAlunoComponent } from './cadastrar-aluno.component';

describe('CadastrarAlunoComponent', () => {
  let component: CadastrarAlunoComponent;
  let fixture: ComponentFixture<CadastrarAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
