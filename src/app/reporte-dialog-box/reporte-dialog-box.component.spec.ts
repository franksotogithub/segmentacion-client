import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDialogBoxComponent } from './reporte-dialog-box.component';

describe('ReporteDialogBoxComponent', () => {
  let component: ReporteDialogBoxComponent;
  let fixture: ComponentFixture<ReporteDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
