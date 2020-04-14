import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormulariosComponent } from './list-formularios.component';

describe('ListFormulariosComponent', () => {
  let component: ListFormulariosComponent;
  let fixture: ComponentFixture<ListFormulariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFormulariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
