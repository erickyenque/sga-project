import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GYearTeacherComponent } from './g-year-teacher.component';

describe('GYearTeacherComponent', () => {
  let component: GYearTeacherComponent;
  let fixture: ComponentFixture<GYearTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GYearTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GYearTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
