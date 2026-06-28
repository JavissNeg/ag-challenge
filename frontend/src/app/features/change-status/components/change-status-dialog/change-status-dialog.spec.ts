import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusDialog } from './change-status-dialog';

describe('ChangeStatusDialog', () => {
  let component: ChangeStatusDialog;
  let fixture: ComponentFixture<ChangeStatusDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeStatusDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeStatusDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
