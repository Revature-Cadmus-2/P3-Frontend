import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UsersFollowerListComponent } from './users-follower-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('UsersFollowerListComponent', () => {
  let component: UsersFollowerListComponent;
  let fixture: ComponentFixture<UsersFollowerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersFollowerListComponent, ],
      imports: [ AppRoutingModule, HttpClientModule ]
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
