import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDeudasComponent } from './reporte-deudas.component';

describe('ReporteDeudasComponent', () => {
  let component: ReporteDeudasComponent;
  let fixture: ComponentFixture<ReporteDeudasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteDeudasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDeudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
