import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddBook } from './modal-add-book';

describe('ModalAddBook', () => {
  let component: ModalAddBook;
  let fixture: ComponentFixture<ModalAddBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
