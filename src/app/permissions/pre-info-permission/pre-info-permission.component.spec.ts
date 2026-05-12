import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInfoPermissionComponent } from './pre-info-permission.component';

describe('PreInfoPermissionComponent', () => {
  let component: PreInfoPermissionComponent;
  let fixture: ComponentFixture<PreInfoPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreInfoPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreInfoPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
