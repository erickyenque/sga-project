import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosApagaComponent } from './pagos-apaga.component';

describe('PagosApagaComponent', () => {
  let component: PagosApagaComponent;
  let fixture: ComponentFixture<PagosApagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosApagaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosApagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
