import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsriMapLeyendaComponent } from './esri-map-leyenda.component';

describe('EsriMapLeyendaComponent', () => {
  let component: EsriMapLeyendaComponent;
  let fixture: ComponentFixture<EsriMapLeyendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsriMapLeyendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsriMapLeyendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
