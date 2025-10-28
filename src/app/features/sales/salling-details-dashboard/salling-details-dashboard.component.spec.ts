import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallingDetailsDashboardComponent } from './salling-details-dashboard.component';

describe('SallingDetailsDashboardComponent', () => {
  let component: SallingDetailsDashboardComponent;
  let fixture: ComponentFixture<SallingDetailsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SallingDetailsDashboardComponent]
    });
    fixture = TestBed.createComponent(SallingDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
