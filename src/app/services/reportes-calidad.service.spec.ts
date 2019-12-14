import { TestBed } from '@angular/core/testing';

import { ReportesCalidadService } from './reportes-calidad.service';

describe('ReportesCalidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportesCalidadService = TestBed.get(ReportesCalidadService);
    expect(service).toBeTruthy();
  });
});
