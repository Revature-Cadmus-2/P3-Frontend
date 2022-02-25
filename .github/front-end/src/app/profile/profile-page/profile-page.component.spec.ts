import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { ProfilePageComponent } from './profile-page.component';
import { ProfileService } from 'src/app/service/profile.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/activatedRouteStub';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let service: ProfileService;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub;

  let fakeUser: User = {
    id: 55,
    username: "Tenzin",
    email: "",
    name: "",
    followings: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule,
        AuthModule.forRoot(
          {
            domain: 'dev-0w--5cqa.us.auth0.com',
            clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
          })],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ]
    })
    .compileComponents();
    service = TestBed.inject(ProfileService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;

    activatedRoute.setParams({id: 55});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component);
  });

  it('user should be created', () => {
    expect(component.currentUser).toBeTruthy();
  });

  // it('should assign result to currentUser', async () => {
  //   spyOn(service, 'getUserById').and.returnValue(Promise.resolve(fakeUser));

  //   component.ngOnInit();

  //   expect(service.getUserById).toHaveBeenCalledWith(55);
  //   expect(component.currentUser).toEqual(fakeUser);
  // })
});
