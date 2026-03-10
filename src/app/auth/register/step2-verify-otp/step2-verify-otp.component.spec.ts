import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2VerifyOtpComponent } from './step2-verify-otp.component';

describe('Step2VerifyOtpComponent', () => {
  let component: Step2VerifyOtpComponent;
  let fixture: ComponentFixture<Step2VerifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2VerifyOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2VerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
