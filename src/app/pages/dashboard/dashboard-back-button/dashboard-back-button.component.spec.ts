import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBackButtonComponent } from './dashboard-back-button.component';

describe('DashboardBackButtonComponent', () => {
  let component: DashboardBackButtonComponent;
  let fixture: ComponentFixture<DashboardBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBackButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
