import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupViewAllComponent } from './group-view-all.component';

describe('GroupViewAllComponent', () => {
  let component: GroupViewAllComponent;
  let fixture: ComponentFixture<GroupViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupViewAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
