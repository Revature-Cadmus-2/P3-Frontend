import { TestBed, fakeAsync, ComponentFixtureAutoDetect, flushMicrotasks } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserCreationService } from './user-creation.service';
import { User } from '../models/user';

const expectedUserUrl = 'https://52.141.211.229/user/api'

describe('UserCreationService', () => {
  let service: UserCreationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', fakeAsync (() => {
    let actualUsers: User[] | undefined;
    let fakeUsers: User[] = [ {
      id: 1,
      username: "Tenzin"
    } ];

    service.getAllUsers().then((users) => {
      actualUsers = users;

      const request = httpMock.expectOne(expectedUserUrl + '/user/');
      request.flush(fakeUsers);
      httpMock.verify();

      expect(actualUsers).toEqual(fakeUsers);
    })
  }));

  it('should get user by username', fakeAsync(() => {
    let fakeUser: User = {
      id: 1,
      email: 'Zoot@zooter.com',
      name: 'Zambie',
      username: 'Zoot',
      followings: []
    };

    spyOn(service, 'getUserByName').and.callThrough();

    service.getUserByName('Zoot');
    flushMicrotasks();
    expect(service.getUserByName).toHaveBeenCalledWith('Zoot');

  }));

  it('should add a user', fakeAsync(() => {
    let fakeUser: User = {
      id: 1,
      email: 'Zoot@zooter.com',
      name: 'Zambie',
      username: 'Zoot',
      followings: []
    };

    spyOn(service, 'AddObject').and.callThrough();

    service.AddObject(fakeUser);
    flushMicrotasks();
    expect(service.AddObject).toHaveBeenCalledWith(fakeUser);
  }));

});
