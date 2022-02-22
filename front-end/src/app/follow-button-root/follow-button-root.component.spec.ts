import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FollowButtonRootComponent } from './follow-button-root.component';
import { AuthModule } from '@auth0/auth0-angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FollowingPost } from '../models/FollowingPost';
import { ProfileService } from '../service/profile.service';
import { User } from '../models/user';

describe('FollowButtonRootComponent', () => {
  let component: FollowButtonRootComponent;
  let service: ProfileService;
  let fixture: ComponentFixture<FollowButtonRootComponent>;
  let activatedRoute: ActivatedRoute = new ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowButtonRootComponent ],
      imports: [ RouterModule, RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot(
        {
          domain: 'dev-0w--5cqa.us.auth0.com',
          clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
        })],
      providers: [
        {
          service: ProfileService,
          provide: ActivatedRoute,
          useValue: activatedRoute
        }]
    })
    .compileComponents();
  });

  
  beforeEach(() => {
    fixture = TestBed.createComponent(FollowButtonRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
    component.ngOnChanges();

    component.isFollow = true;
    component.onClick();
    component.isFollow = false;
    component.onClick();
  });

  it('should change on click', () => {
    spyOn(component, 'onClick');
    fixture.debugElement.query(By.css('ng-button')).nativeElement.click();
    expect(component.onClick).toHaveBeenCalled();

    component.isFollow = false;
    component.onClick;
  });

  it('should follow', () => {
    component.ngOnInit();
    component.isFollow = true;
    component.onClick();
    expect(component.isFollow).toBe(false);
  });

  it('should check if user is logged in', () =>{
      let spyOne = spyOn(component.auth.user$, 'subscribe');
      component.ngOnInit();
      expect(spyOne).toHaveBeenCalled();
  });
});
