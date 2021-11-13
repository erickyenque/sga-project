import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RDashboardComponent } from './r-dashboard.component';

describe('RDashboardComponent', () => {
  let component: RDashboardComponent;
  let fixture: ComponentFixture<RDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
