import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GApafaComponent } from './g-apafa.component';

describe('GApafaComponent', () => {
  let component: GApafaComponent;
  let fixture: ComponentFixture<GApafaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GApafaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GApafaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
