import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostTopViewersReportComponent } from './most-top-viewers-report.component';

describe('MostTopViewersReportComponent', () => {
  let component: MostTopViewersReportComponent;
  let fixture: ComponentFixture<MostTopViewersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostTopViewersReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostTopViewersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
