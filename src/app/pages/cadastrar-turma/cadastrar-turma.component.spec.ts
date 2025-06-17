import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTurmaComponent } from './cadastrar-turma.component';

describe('CadastrarTurmaComponent', () => {
  let component: CadastrarTurmaComponent;
  let fixture: ComponentFixture<CadastrarTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarTurmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
