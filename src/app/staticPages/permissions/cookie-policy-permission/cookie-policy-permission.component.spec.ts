import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePolicyPermissionComponent } from './cookie-policy-permission.component';

describe('CookiePolicyPermissionComponent', () => {
  let component: CookiePolicyPermissionComponent;
  let fixture: ComponentFixture<CookiePolicyPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiePolicyPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiePolicyPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
