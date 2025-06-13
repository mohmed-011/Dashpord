import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedReportComponent } from './advanced-report.component';

describe('AdvancedReportComponent', () => {
  let component: AdvancedReportComponent;
  let fixture: ComponentFixture<AdvancedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
