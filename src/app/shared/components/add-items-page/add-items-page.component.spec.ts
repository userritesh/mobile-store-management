import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsPageComponent } from './add-items-page.component';

describe('AddItemsPageComponent', () => {
  let component: AddItemsPageComponent;
  let fixture: ComponentFixture<AddItemsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddItemsPageComponent]
    });
    fixture = TestBed.createComponent(AddItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
