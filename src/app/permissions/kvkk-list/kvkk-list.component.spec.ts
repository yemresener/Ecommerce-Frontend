import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvkkListComponent } from './kvkk-list.component';

describe('KvkkListComponent', () => {
  let component: KvkkListComponent;
  let fixture: ComponentFixture<KvkkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvkkListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KvkkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
