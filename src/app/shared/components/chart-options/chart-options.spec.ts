import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOptions } from './chart-options';

describe('ChartOptions', () => {
  let component: ChartOptions;
  let fixture: ComponentFixture<ChartOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
