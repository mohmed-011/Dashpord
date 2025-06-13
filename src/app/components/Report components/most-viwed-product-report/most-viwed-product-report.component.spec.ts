import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViwedProductReportComponent } from './most-viwed-product-report.component';

describe('MostViwedProductReportComponent', () => {
  let component: MostViwedProductReportComponent;
  let fixture: ComponentFixture<MostViwedProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostViwedProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostViwedProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
