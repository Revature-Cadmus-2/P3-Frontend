import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FollowButtonComponent } from './follow-button.component';
import { By } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Followings } from 'src/app/models/Followings';

describe('FollowButtonComponent', () => {
  let component: FollowButtonComponent;
  let fixture: ComponentFixture<FollowButtonComponent>;
  let de: DebugElement;
  let httpMock: HttpTestingController;
  let activatedRoute: ActivatedRoute = new ActivatedRoute;

  let follows: Followings[] = [
    {
      id: 1,
      followerUserId: 2,
      followingUserId: 1,
      followingUserName: 'George'
    },
    {
      id: 2,
      followerUserId: 1,
      followingUserId: 2,
      followingUserName: 'Steven'
    }
  ]
  let followSingular: Followings;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowButtonComponent ],
      imports: [RouterModule, RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot(
        {
          domain: 'dev-0w--5cqa.us.auth0.com',
          clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
        })],
      providers: [
        {
            provide: ActivatedRoute,
            useValue: activatedRoute
        }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowButtonComponent);
    component = fixture.componentInstance;
    fixture.debugElement;
    TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnChanges();
  });

  it('should check follows', () => {
    component.followId = 1;
    followSingular = component.checkFollows([]);
    followSingular = component.checkFollows(follows);
    component.followId = 7;
    followSingular = component.checkFollows(follows);
  })

  it('should change on click', () => {
    spyOn(component, 'onClick');
    fixture.debugElement.query(By.css('ng-button')).nativeElement.click();
    expect(component.onClick).toHaveBeenCalled();

    component.isFollow = false;
    component.onClick;
  });

  it('should follow', () => {
    component.isFollow = false;
    component.onClick();
    expect(component.isFollow).toBe(true);
  });

    
});
