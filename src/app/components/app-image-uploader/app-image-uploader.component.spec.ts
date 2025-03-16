import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppImageUploaderComponent } from './app-image-uploader.component';

describe('AppImageUploaderComponent', () => {
  let component: AppImageUploaderComponent;
  let fixture: ComponentFixture<AppImageUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppImageUploaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
