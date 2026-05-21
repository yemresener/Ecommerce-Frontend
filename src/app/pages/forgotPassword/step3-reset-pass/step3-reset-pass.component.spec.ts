import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3ResetPassComponent } from './step3-reset-pass.component';

describe('Step3ResetPassComponent', () => {
  let component: Step3ResetPassComponent;
  let fixture: ComponentFixture<Step3ResetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3ResetPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3ResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
