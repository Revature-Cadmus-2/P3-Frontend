import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookMarkComponent } from './book-mark.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookMarkComponent', () => {
  let component: BookMarkComponent;
  let fixture: ComponentFixture<BookMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookMarkComponent ],
      imports: [  RouterModule, RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
