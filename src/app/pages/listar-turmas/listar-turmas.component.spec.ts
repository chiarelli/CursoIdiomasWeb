import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTurmasComponent } from './listar-turmas.component';

describe('ListarTurmasComponent', () => {
  let component: ListarTurmasComponent;
  let fixture: ComponentFixture<ListarTurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTurmasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
