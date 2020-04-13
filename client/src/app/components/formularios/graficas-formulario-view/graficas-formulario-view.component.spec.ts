import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasFormularioViewComponent } from './graficas-formulario-view.component';

describe('GraficasFormularioViewComponent', () => {
  let component: GraficasFormularioViewComponent;
  let fixture: ComponentFixture<GraficasFormularioViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasFormularioViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasFormularioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
