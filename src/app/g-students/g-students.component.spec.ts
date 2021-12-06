import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GStudentsComponent } from './g-students.component';

describe('GStudentsComponent', () => {
  let component: GStudentsComponent;
  let fixture: ComponentFixture<GStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
