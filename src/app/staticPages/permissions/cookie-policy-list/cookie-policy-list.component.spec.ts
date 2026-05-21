import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePolicyListComponent } from './cookie-policy-list.component';

describe('CookiePolicyListComponent', () => {
  let component: CookiePolicyListComponent;
  let fixture: ComponentFixture<CookiePolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiePolicyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiePolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
