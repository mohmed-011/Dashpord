import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrdersByCityComponent } from './seller-orders-by-city.component';

describe('SellerOrdersByCityComponent', () => {
  let component: SellerOrdersByCityComponent;
  let fixture: ComponentFixture<SellerOrdersByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerOrdersByCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerOrdersByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
