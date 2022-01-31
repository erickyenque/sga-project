import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GUsers2Component } from './g-users2.component';

describe('GUsers2Component', () => {
  let component: GUsers2Component;
  let fixture: ComponentFixture<GUsers2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GUsers2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GUsers2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
