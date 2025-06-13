import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedProductReportComponent } from './discounted-product-report.component';

describe('DiscountedProductReportComponent', () => {
  let component: DiscountedProductReportComponent;
  let fixture: ComponentFixture<DiscountedProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountedProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountedProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
