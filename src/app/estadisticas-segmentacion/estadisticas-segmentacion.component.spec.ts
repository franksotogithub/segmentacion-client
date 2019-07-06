import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReporteService} from '../services/reporte.service';
import {ParametrosService} from '../services/parametros.service';
import { EstadisticasSegmentacionComponent } from './estadisticas-segmentacion.component';

describe('EstadisticasSegmentacionComponent', () => {
  let component: EstadisticasSegmentacionComponent;
  let fixture: ComponentFixture<EstadisticasSegmentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasSegmentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasSegmentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
