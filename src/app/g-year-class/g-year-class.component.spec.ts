import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GYearClassComponent } from './g-year-class.component';

describe('GYearClassComponent', () => {
  let component: GYearClassComponent;
  let fixture: ComponentFixture<GYearClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GYearClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GYearClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
