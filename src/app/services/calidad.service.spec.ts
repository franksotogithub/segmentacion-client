import { TestBed } from '@angular/core/testing';

import { CalidadService } from './calidad.service';

describe('CalidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalidadService = TestBed.get(CalidadService);
    expect(service).toBeTruthy();
  });
});
