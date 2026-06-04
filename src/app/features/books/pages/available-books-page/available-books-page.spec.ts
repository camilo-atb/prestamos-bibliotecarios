import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBooksPage } from './available-books-page';

describe('AvailableBooksPage', () => {
  let component: AvailableBooksPage;
  let fixture: ComponentFixture<AvailableBooksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableBooksPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableBooksPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
