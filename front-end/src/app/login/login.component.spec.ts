import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import {By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let activatedRoute: ActivatedRoute = new ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterModule, HttpClientTestingModule, RouterTestingModule, AuthModule.forRoot(
        {
          domain: 'dev-0w--5cqa.us.auth0.com',
          clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
        }
        )],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have at least one button on the page', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length >= 1).toBeTruthy();
  });

  it('should have one button with "Login" on the page', () => {
    const linkDes = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
    expect(nativeButton.textContent).toBe('Log into Cadmus');
  });

  it('should have one button with "Register" on the page', () => {
    const linkDes = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDes[1].nativeElement;
    expect(nativeButton.textContent).toBe('Create new account');
  });

  it('should not have the logout button on the page when user is not logged in', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.btn3'));
    expect(buttons.length <= 1).toBeTruthy();
  });


  it('should call login func', async () => {

    spyOn(component, 'Loginfunc');
    component.Loginfunc();
    expect(component.Loginfunc).toHaveBeenCalled();

  });



});
