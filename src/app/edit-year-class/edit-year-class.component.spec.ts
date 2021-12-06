import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYearClassComponent } from './edit-year-class.component';

describe('EditYearClassComponent', () => {
  let component: EditYearClassComponent;
  let fixture: ComponentFixture<EditYearClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYearClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYearClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
