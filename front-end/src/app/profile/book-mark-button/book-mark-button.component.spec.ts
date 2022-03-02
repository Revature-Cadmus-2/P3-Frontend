import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookMarkButtonComponent } from './book-mark-button.component';
import { AuthModule } from '@auth0/auth0-angular';

describe('BookMarkButtonComponent', () => {
  let component: BookMarkButtonComponent;
  let fixture: ComponentFixture<BookMarkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookMarkButtonComponent ],
      imports: [ HttpClientTestingModule, AuthModule.forRoot({
        domain: 'dev-b0fxq42a.us.auth0.com',
        clientId: 'Hp374kDB7mqFHtv2tYvbE0g2IS6zQwum'
      })]
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
