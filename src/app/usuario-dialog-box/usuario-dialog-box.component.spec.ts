import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDialogBoxComponent } from './usuario-dialog-box.component';

describe('UsuarioDialogBoxComponent', () => {
  let component: UsuarioDialogBoxComponent;
  let fixture: ComponentFixture<UsuarioDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
