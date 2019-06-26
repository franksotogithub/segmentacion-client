import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesSegmentacionDetalleComponent } from './reportes-segmentacion-detalle.component';

describe('ReportesSegmentacionDetalleComponent', () => {
  let component: ReportesSegmentacionDetalleComponent;
  let fixture: ComponentFixture<ReportesSegmentacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesSegmentacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesSegmentacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
