import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCardListComponent } from './saved-card-list.component';

describe('SavedCardListComponent', () => {
  let component: SavedCardListComponent;
  let fixture: ComponentFixture<SavedCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
