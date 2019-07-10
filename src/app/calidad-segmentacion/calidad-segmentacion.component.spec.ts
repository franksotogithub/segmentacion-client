import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadSegmentacionComponent } from './calidad-segmentacion.component';

describe('CalidadSegmentacionComponent', () => {
  let component: CalidadSegmentacionComponent;
  let fixture: ComponentFixture<CalidadSegmentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadSegmentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadSegmentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
