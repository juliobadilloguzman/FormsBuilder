import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderEditViewComponent } from './builder-edit-view.component';

describe('BuilderEditViewComponent', () => {
  let component: BuilderEditViewComponent;
  let fixture: ComponentFixture<BuilderEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderEditViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
