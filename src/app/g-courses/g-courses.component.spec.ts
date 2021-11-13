import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCoursesComponent } from './g-courses.component';

describe('GCoursesComponent', () => {
  let component: GCoursesComponent;
  let fixture: ComponentFixture<GCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
