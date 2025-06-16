import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExclusaoAlunoComponent } from './modal-exclusao-aluno.component';

describe('ModalExclusaoAlunoComponent', () => {
  let component: ModalExclusaoAlunoComponent;
  let fixture: ComponentFixture<ModalExclusaoAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExclusaoAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExclusaoAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
