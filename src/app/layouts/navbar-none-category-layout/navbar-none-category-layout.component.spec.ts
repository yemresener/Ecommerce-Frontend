import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNoneCategoryLayoutComponent } from './navbar-none-category-layout.component';

describe('NavbarNoneCategoryLayoutComponent', () => {
  let component: NavbarNoneCategoryLayoutComponent;
  let fixture: ComponentFixture<NavbarNoneCategoryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarNoneCategoryLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarNoneCategoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
