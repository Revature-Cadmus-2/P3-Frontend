import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import {By} from '@angular/platform-browser';
import { BufferComponent } from './buffer.component';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { RootComponent } from '../root/root.component';
import { UserCreationService } from '../service/user-creation.service';
import { User } from '../models/user';

describe('BufferComponent', () => {
  let component: BufferComponent;
  let fixture: ComponentFixture<BufferComponent>;
  let router: Router;
  let location: Location;
  let service: UserCreationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BufferComponent ],
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'root', component: RootComponent}]),
        AuthModule.forRoot(
        {
          domain: 'dev-0w--5cqa.us.auth0.com',
          clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
        })],
      providers: [{ provide: UserCreationService}]
    })
    .compileComponents();
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    service = TestBed.inject(UserCreationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //or declare variable here
  });

  it('should create', () => {
    //declare variable here
    expect(component).toBeTruthy();
    router.navigateByUrl("/root").then(() => {
      expect(location.path()).toBe("/root");
    })
  });

  it('should have a buffer', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.buffer'));
    expect(buttons.length >= 1).toBeTruthy();
  });

  it('Should navigate to /root', fakeAsync(() => {
    router.navigateByUrl("/root").then(() => {
      expect(location.path()).toBe("/root");
    })
  }));

  it('should get user by username', async () => {
    let fakeUser: User = {
      id: 1,
      email: 'Zoot@zooter.com',
      name: 'Zambie',
      username: 'Zoot',
      followings: []
    };
    spyOn(service, 'getUserByName').and.returnValue(Promise.resolve(fakeUser));

    await service.getUserByName('Zoot').then((res) => {
      expect(res).toEqual(fakeUser);
      expect(service.getUserByName).toHaveBeenCalledWith('Zoot');
    })
  });

})
