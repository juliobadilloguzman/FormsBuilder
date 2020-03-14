import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasLlenadoViewComponent } from './respuestas-llenado-view.component';

describe('RespuestasLlenadoViewComponent', () => {
  let component: RespuestasLlenadoViewComponent;
  let fixture: ComponentFixture<RespuestasLlenadoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasLlenadoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasLlenadoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
