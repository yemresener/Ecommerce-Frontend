import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyPermissionComponent } from './privacy-policy-permission.component';

describe('PrivacyPolicyPermissionComponent', () => {
  let component: PrivacyPolicyPermissionComponent;
  let fixture: ComponentFixture<PrivacyPolicyPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
