import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfilePicComponent } from './profile-pic.component';
import { AuthModule } from '@auth0/auth0-angular';

describe('ProfilePicComponent', () => {
  let component: ProfilePicComponent;
  let fixture: ComponentFixture<ProfilePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePicComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot({
        domain: 'dev-b0fxq42a.us.auth0.com',
        clientId: 'Hp374kDB7mqFHtv2tYvbE0g2IS6zQwum'
      }) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
