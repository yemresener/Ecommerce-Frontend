import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewSkeletonComponent } from './product-review-skeleton.component';

describe('ProductReviewSkeletonComponent', () => {
  let component: ProductReviewSkeletonComponent;
  let fixture: ComponentFixture<ProductReviewSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviewSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReviewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
