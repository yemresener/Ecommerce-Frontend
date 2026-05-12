import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceSalesListComponent } from './distance-sales-list.component';

describe('DistanceSalesListComponent', () => {
  let component: DistanceSalesListComponent;
  let fixture: ComponentFixture<DistanceSalesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistanceSalesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistanceSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
