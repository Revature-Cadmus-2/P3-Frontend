import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RootComponent } from './root.component';
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { AuthModule } from '@auth0/auth0-angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';

describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot(
        {
          domain: 'dev-0w--5cqa.us.auth0.com',
          clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
        }
        )],
      declarations: [RootComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to create post`, () => {
    expect(routerSpy.navigateByUrl);
  });

  it(`should navigate to comments`, () => {
    expect(routerSpy.navigateByUrl);
  });*/
});
