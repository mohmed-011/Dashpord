import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsoldProductReportComponent } from './unsold-product-report.component';

describe('UnsoldProductReportComponent', () => {
  let component: UnsoldProductReportComponent;
  let fixture: ComponentFixture<UnsoldProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsoldProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsoldProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
