import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullpageLoaderComponent } from './fullpage-loader.component';

describe('FullpageLoaderComponent', () => {
  let component: FullpageLoaderComponent;
  let fixture: ComponentFixture<FullpageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullpageLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullpageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
