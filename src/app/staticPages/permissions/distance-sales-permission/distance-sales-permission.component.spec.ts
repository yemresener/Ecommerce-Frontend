import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceSalesPermissionComponent } from './distance-sales-permission.component';

describe('DistanceSalesPermissionComponent', () => {
  let component: DistanceSalesPermissionComponent;
  let fixture: ComponentFixture<DistanceSalesPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistanceSalesPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistanceSalesPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
