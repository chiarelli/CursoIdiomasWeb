import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricularAlunoComponent } from './matricular-aluno.component';

describe('MatricularAlunoComponent', () => {
  let component: MatricularAlunoComponent;
  let fixture: ComponentFixture<MatricularAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatricularAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatricularAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
