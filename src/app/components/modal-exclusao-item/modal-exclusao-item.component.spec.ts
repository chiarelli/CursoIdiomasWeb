import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExclusaoItemComponent } from './modal-exclusao-item.component';

describe('ModalExclusaoAlunoComponent', () => {
  let component: ModalExclusaoItemComponent;
  let fixture: ComponentFixture<ModalExclusaoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExclusaoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExclusaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
