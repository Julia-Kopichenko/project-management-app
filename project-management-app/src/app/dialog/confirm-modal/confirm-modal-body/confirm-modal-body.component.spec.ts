import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalBodyComponent } from './confirm-modal-body.component';

describe('ConfirmModalBodyComponent', () => {
  let component: ConfirmModalBodyComponent;
  let fixture: ComponentFixture<ConfirmModalBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModalBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
