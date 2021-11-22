import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearClassComponent } from './year-class.component';

describe('YearClassComponent', () => {
  let component: YearClassComponent;
  let fixture: ComponentFixture<YearClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
