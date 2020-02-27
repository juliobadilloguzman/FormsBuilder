import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosViewComponent } from './formularios-view.component';

describe('FormulariosViewComponent', () => {
  let component: FormulariosViewComponent;
  let fixture: ComponentFixture<FormulariosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
