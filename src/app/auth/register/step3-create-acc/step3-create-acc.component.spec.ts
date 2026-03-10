import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3CreateAccComponent } from './step3-create-acc.component';

describe('Step3CreateAccComponent', () => {
  let component: Step3CreateAccComponent;
  let fixture: ComponentFixture<Step3CreateAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3CreateAccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3CreateAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
