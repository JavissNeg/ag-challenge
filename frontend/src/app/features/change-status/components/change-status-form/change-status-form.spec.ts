import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusForm } from './change-status-form';

describe('ChangeStatusForm', () => {
  let component: ChangeStatusForm;
  let fixture: ComponentFixture<ChangeStatusForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeStatusForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeStatusForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
