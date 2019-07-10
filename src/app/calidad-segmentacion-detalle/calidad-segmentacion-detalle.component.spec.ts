import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadSegmentacionDetalleComponent } from './calidad-segmentacion-detalle.component';

describe('CalidadSegmentacionDetalleComponent', () => {
  let component: CalidadSegmentacionDetalleComponent;
  let fixture: ComponentFixture<CalidadSegmentacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadSegmentacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadSegmentacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
