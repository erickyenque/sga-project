import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsers2Component } from './edit-users2.component';

describe('EditUsers2Component', () => {
  let component: EditUsers2Component;
  let fixture: ComponentFixture<EditUsers2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUsers2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsers2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
