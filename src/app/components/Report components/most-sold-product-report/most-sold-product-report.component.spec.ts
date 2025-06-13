import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSoldProductReportComponent } from './most-sold-product-report.component';

describe('MostSoldProductReportComponent', () => {
  let component: MostSoldProductReportComponent;
  let fixture: ComponentFixture<MostSoldProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostSoldProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostSoldProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
