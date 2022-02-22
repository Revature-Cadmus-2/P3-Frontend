import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';
import { LoginButtonsComponent } from './login-buttons/login-buttons.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterButtonComponent } from './register-button/register-button.component';
import { SearchComponent } from './search/search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule, AuthModule.forRoot(
          {
            domain: 'dev-0w--5cqa.us.auth0.com',
            clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
          }
        )
      ],
      declarations: [
        AppComponent,
        NavBarComponent,
        SearchComponent,
        LoginButtonsComponent,
        RegisterButtonComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'front-end'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('front-end');
  });
});
