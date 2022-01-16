import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasCursoComponent } from './notas-curso.component';

describe('NotasCursoComponent', () => {
  let component: NotasCursoComponent;
  let fixture: ComponentFixture<NotasCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
