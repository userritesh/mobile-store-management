import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvilabelStockComponent } from './avilabel-stock.component';

describe('AvilabelStockComponent', () => {
  let component: AvilabelStockComponent;
  let fixture: ComponentFixture<AvilabelStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvilabelStockComponent]
    });
    fixture = TestBed.createComponent(AvilabelStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
