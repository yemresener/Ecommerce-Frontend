import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneFotterLayoutComponent } from './none-fotter-layout.component';

describe('NoneFotterLayoutComponent', () => {
  let component: NoneFotterLayoutComponent;
  let fixture: ComponentFixture<NoneFotterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoneFotterLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoneFotterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
