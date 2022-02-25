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
            domain: 'dev-b0fxq42a.us.auth0.com',
            clientId: 'RjcefAYAV8RI8rMHIN1xs6Ni2Y0FxhFy'
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
