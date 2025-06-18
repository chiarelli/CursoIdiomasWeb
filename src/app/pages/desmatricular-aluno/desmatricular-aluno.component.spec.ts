import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesmatricularAlunoComponent } from './desmatricular-aluno.component';

describe('DesmatricularAlunoComponent', () => {
  let component: DesmatricularAlunoComponent;
  let fixture: ComponentFixture<DesmatricularAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesmatricularAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesmatricularAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
