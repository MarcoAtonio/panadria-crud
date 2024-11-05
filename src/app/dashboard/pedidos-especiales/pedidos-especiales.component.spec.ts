import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosEspecialesComponent } from './pedidos-especiales.component';

describe('PedidosEspecialesComponent', () => {
  let component: PedidosEspecialesComponent;
  let fixture: ComponentFixture<PedidosEspecialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosEspecialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
