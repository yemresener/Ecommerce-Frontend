import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPermissionComponent } from './membership-permission.component';

describe('MembershipPermissionComponent', () => {
  let component: MembershipPermissionComponent;
  let fixture: ComponentFixture<MembershipPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
