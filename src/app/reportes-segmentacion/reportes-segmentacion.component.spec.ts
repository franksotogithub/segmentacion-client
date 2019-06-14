import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesSegmentacionComponent } from './reportes-segmentacion.component';

describe('ReportesSegmentacionComponent', () => {
  let component: ReportesSegmentacionComponent;
  let fixture: ComponentFixture<ReportesSegmentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesSegmentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesSegmentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
