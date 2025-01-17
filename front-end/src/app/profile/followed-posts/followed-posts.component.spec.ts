 import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FollowedPostsComponent } from './followed-posts.component';
import { SimpleChange } from '@angular/core';

describe('FollowedPostsComponent', () => {
  let component: FollowedPostsComponent;
  let fixture: ComponentFixture<FollowedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowedPostsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot({ //For the Notifications
        timeOut: 1000, //time is in milliseconds
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true,
      }),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedPostsComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the MANUAL execution of the OnChanges', () => {
    component.id = 4;
    component.ngOnChanges({
      id: new SimpleChange(null, component.id, null)
    });
    fixture.detectChanges();
    expect (component.message).toContain('ngOnChanges Executed');
  });
});