import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfStokProductReportComponent } from './out-of-stok-product-report.component';

describe('OutOfStokProductReportComponent', () => {
  let component: OutOfStokProductReportComponent;
  let fixture: ComponentFixture<OutOfStokProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutOfStokProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutOfStokProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
