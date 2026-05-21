import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReviewsComponent } from './dashboard-reviews.component';

describe('DashboardReviewsComponent', () => {
  let component: DashboardReviewsComponent;
  let fixture: ComponentFixture<DashboardReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
