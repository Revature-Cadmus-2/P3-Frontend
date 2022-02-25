import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Root } from '../models/root';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchComponent } from './search.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { By } from '@angular/platform-browser';
import { RootServiceService } from '../service/root-service.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activatedRouteStub';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let service: RootServiceService;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub;

  let fakeData: Root[] = [
    {
      id: 1,
      title: 'Walking the Dog',
      message: 'It was sunday morning when I...',
      totalVote: 4,
      dateTime: new Date('November 4, 2021 03:24:00'),
      userName: 'ToTheMoon1234',
      comments: []
    },
    {
      id: 2,
      title: 'Late night TV',
      message: 'I watched cartoons last night ...',
      totalVote: 6,
      dateTime: new Date('January 20, 2021 05:45:00'),
      userName: 'WoWoWubzy456',
      comments: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ]
    })
      .compileComponents();
      service = TestBed.inject(RootServiceService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(service, 'getAllRoots').and.returnValue(Promise.resolve(fakeData));

    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  // describe('Array Test', () => {

  it('should filter stories by title', () => {
    let value = 'walking';

    component.onEnter(value);
    expect(component.result === fakeData[0]);

    component.onEnter('');
    expect(component.result = []);
  });

  it('should clear', () => {
    component.onClear();
    expect(component.result = []);
  })

  it('should open content', () => {
    component.open("Hello");
  })

  //   it('should filter stories by username', () => {
  //     let value = 'WoWoW';
  //     let result;
  //     let fakeData: Root[] = [
  //       {
  //         id: 1,
  //         title: 'Walking the Dog',
  //         message: 'It was sunday morning when I...',
  //         totalVote: 4,
  //         dateTime: new Date('November 4, 2021 03:24:00'),
  //         userName: 'ToTheMoon1234',
  //         comments: []
  //       },
  //       {
  //         id: 2,
  //         title: 'Late night TV',
  //         message: 'I watched cartoons last night ...',
  //         totalVote: 6,
  //         dateTime: new Date('January 20, 2021 05:45:00'),
  //         userName: 'WoWoWubzy456',
  //         comments: []
  //       }
  //     ];

  //     result = fakeData.filter(res => res.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
  //       res.userName.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
  //     expect(result).toEqual([{
  //       id: 2,
  //       title: 'Late night TV',
  //       message: 'I watched cartoons last night ...',
  //       totalVote: 6,
  //       dateTime: new Date('January 20, 2021 05:45:00'),
  //       userName: 'WoWoWubzy456',
  //       comments: []
  //     }]);
  //   });
  // });


});
