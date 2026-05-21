import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDashboardWidgetComponent } from './address-dashboard-widget.component';

describe('AddressDashboardWidgetComponent', () => {
  let component: AddressDashboardWidgetComponent;
  let fixture: ComponentFixture<AddressDashboardWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressDashboardWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressDashboardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
