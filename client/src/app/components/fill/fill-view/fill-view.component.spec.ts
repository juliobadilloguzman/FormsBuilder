import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillViewComponent } from './fill-view.component';

describe('FillViewComponent', () => {
  let component: FillViewComponent;
  let fixture: ComponentFixture<FillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
