import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachItemPageComponent } from './advert-item-page.component';

describe('EachItemPageComponent', () => {
  let component: EachItemPageComponent;
  let fixture: ComponentFixture<EachItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EachItemPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
