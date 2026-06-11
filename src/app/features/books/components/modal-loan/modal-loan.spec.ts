import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoan } from './modal-loan';

describe('ModalLoan', () => {
  let component: ModalLoan;
  let fixture: ComponentFixture<ModalLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLoan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLoan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
