import { TestBed } from '@angular/core/testing';

import { TurmasService } from './turmas.service';

describe('TurmasService', () => {
  let service: TurmasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurmasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
