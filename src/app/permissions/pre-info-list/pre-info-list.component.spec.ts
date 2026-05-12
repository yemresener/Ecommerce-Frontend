import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInfoListComponent } from './pre-info-list.component';

describe('PreInfoListComponent', () => {
  let component: PreInfoListComponent;
  let fixture: ComponentFixture<PreInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreInfoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
