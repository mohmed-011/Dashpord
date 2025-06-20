import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRateProductReportComponent } from './top-rate-product-report.component';

describe('TopRateProductReportComponent', () => {
  let component: TopRateProductReportComponent;
  let fixture: ComponentFixture<TopRateProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRateProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopRateProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
