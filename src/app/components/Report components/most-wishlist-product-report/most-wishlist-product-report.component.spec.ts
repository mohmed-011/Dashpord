import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostWishlistProductReportComponent } from './most-wishlist-product-report.component';

describe('MostWishlistProductReportComponent', () => {
  let component: MostWishlistProductReportComponent;
  let fixture: ComponentFixture<MostWishlistProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostWishlistProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostWishlistProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
