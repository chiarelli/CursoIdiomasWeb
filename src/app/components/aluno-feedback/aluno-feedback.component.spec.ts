import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoFeedbackComponent } from './aluno-feedback.component';

describe('AlunoFeedbackComponent', () => {
  let component: AlunoFeedbackComponent;
  let fixture: ComponentFixture<AlunoFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
