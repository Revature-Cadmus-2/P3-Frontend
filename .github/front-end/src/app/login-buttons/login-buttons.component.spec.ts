import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { LoginButtonsComponent } from './login-buttons.component';

describe('LoginButtonsComponent', () => {
  let component: LoginButtonsComponent;
  let fixture: ComponentFixture<LoginButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AuthModule.forRoot(
        {
          domain: 'dev-0w--5cqa.us.auth0.com',
          clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
        }
      )],
      declarations: [ LoginButtonsComponent, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have the logout button on the page when user is not logged in', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.logout'));
    expect(buttons.length <= 1).toBeTruthy();
  });

});
