import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToastComponent } from './main-toast.component';

describe('MainToastComponent', () => {
  let component: MainToastComponent;
  let fixture: ComponentFixture<MainToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
