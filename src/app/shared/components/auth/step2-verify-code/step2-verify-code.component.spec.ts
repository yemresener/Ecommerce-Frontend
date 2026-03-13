import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2VerifyCodeComponent } from './step2-verify-code.component';

describe('Step2VerifyCodeComponent', () => {
  let component: Step2VerifyCodeComponent;
  let fixture: ComponentFixture<Step2VerifyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2VerifyCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2VerifyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
