import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProfitItemsComponent } from './top-profit-items.component';

describe('TopProfitItemsComponent', () => {
  let component: TopProfitItemsComponent;
  let fixture: ComponentFixture<TopProfitItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopProfitItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopProfitItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
