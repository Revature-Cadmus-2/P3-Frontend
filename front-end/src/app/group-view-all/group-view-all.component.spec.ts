import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupViewAllComponent } from './group-view-all.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';



describe('GroupViewAllComponent', () => {
  let component: GroupViewAllComponent;
  let fixture: ComponentFixture<GroupViewAllComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupViewAllComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, AuthModule.forRoot({
        domain: 'dev-b0fxq42a.us.auth0.com',
        clientId: 'RjcefAYAV8RI8rMHIN1xs6Ni2Y0FxhFy'
      }) ]
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
