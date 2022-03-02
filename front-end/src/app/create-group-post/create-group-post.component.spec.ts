import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGroupPostComponent } from './create-group-post.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


describe('CreateGroupPostComponent', () => {
  let component: CreateGroupPostComponent;
  let fixture: ComponentFixture<CreateGroupPostComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupPostComponent ],
      imports: [ FormsModule,HttpClientTestingModule,RouterTestingModule, AuthModule.forRoot({
        domain: 'dev-b0fxq42a.us.auth0.com',
        clientId: 'RjcefAYAV8RI8rMHIN1xs6Ni2Y0FxhFy'
      }),ToastrModule.forRoot({ //For the Notifications
        timeOut: 1000, //time is in milliseconds
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true,
      }) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
