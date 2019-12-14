import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCalidadComponent } from './reportes-calidad.component';

describe('ReportesCalidadComponent', () => {
  let component: ReportesCalidadComponent;
  let fixture: ComponentFixture<ReportesCalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesCalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
