import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvkkPermissionComponent } from './kvkk-permission.component';

describe('KvkkPermissionComponent', () => {
  let component: KvkkPermissionComponent;
  let fixture: ComponentFixture<KvkkPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvkkPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KvkkPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
