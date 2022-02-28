import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMarkButtonComponent } from './book-mark-button.component';

describe('BookMarkButtonComponent', () => {
  let component: BookMarkButtonComponent;
  let fixture: ComponentFixture<BookMarkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookMarkButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMarkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
