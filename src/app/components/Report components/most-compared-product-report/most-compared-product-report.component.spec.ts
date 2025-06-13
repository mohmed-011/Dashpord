import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostComparedProductReportComponent } from './most-compared-product-report.component';

describe('MostComparedProductReportComponent', () => {
  let component: MostComparedProductReportComponent;
  let fixture: ComponentFixture<MostComparedProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostComparedProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostComparedProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
