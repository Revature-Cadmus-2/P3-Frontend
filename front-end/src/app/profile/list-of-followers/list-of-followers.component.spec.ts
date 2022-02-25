import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ListOfFollowersComponent } from './list-of-followers.component';
import { Component, DebugElement, SimpleChange } from '@angular/core';

describe('ListOfFollowersComponent', () => {
  let component: ListOfFollowersComponent;
  let fixture: ComponentFixture<ListOfFollowersComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfFollowersComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFollowersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should test the OnInit Hook',() => {
    expect (component.message).toContain('OnInit Executed:- ');
  });



  it('should test the manual execution of the OnChanges', () => {
    component.id = 4;
    component.ngOnChanges({
      id: new SimpleChange(null, component.id, null)
    });
    fixture.detectChanges();
    expect (component.message).toContain('ngOnChanges Executed');

  });

  it('should test OnChanges returns an array of users', () => {
    component.id = 4;
    component.ngOnChanges({
      id: new SimpleChange(null, component.id, null)
    });
    fixture.detectChanges();
    spyOn(component.profileService, "getUserById").and.callThrough();
    component.profileService.getUserById(component.id);
    expect(component.profileService.getUserById).toHaveBeenCalled();
  });
});

