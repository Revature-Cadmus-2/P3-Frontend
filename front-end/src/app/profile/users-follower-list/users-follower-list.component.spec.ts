import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFollowerListComponent } from './users-follower-list.component';

describe('UsersFollowerListComponent', () => {
  let component: UsersFollowerListComponent;
  let fixture: ComponentFixture<UsersFollowerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersFollowerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFollowerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
