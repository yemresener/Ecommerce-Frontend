import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1EmailOtpComponent } from './step1-email-otp.component';

describe('Step1EmailOtpComponent', () => {
  let component: Step1EmailOtpComponent;
  let fixture: ComponentFixture<Step1EmailOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1EmailOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1EmailOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
