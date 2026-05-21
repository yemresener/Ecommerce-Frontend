import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1EmailComponent } from './step1-email.component';

describe('Step1EmailComponent', () => {
  let component: Step1EmailComponent;
  let fixture: ComponentFixture<Step1EmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1EmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
