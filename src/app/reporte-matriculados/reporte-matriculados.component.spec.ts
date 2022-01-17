import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMatriculadosComponent } from './reporte-matriculados.component';

describe('ReporteMatriculadosComponent', () => {
  let component: ReporteMatriculadosComponent;
  let fixture: ComponentFixture<ReporteMatriculadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMatriculadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMatriculadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
