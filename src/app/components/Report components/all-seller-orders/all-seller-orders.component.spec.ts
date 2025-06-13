import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSellerOrdersComponent } from './all-seller-orders.component';

describe('AllSellerOrdersComponent', () => {
  let component: AllSellerOrdersComponent;
  let fixture: ComponentFixture<AllSellerOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSellerOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSellerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
