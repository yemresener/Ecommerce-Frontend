import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddressComponent } from './dashboard-address.component';

describe('DashboardAddressComponent', () => {
  let component: DashboardAddressComponent;
  let fixture: ComponentFixture<DashboardAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
