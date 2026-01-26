import { TestBed } from '@angular/core/testing';

import { NavbarCategoryService } from './navbar-category.service';

describe('NavbarCategoryService', () => {
  let service: NavbarCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
