import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesChip } from './status-chip';

describe('StatesChip', () => {
  let component: StatesChip;
  let fixture: ComponentFixture<StatesChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesChip],
    }).compileComponents();

    fixture = TestBed.createComponent(StatesChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
