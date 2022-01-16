import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoursesFilesComponent } from './my-courses-files.component';

describe('MyCoursesFilesComponent', () => {
  let component: MyCoursesFilesComponent;
  let fixture: ComponentFixture<MyCoursesFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCoursesFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCoursesFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
