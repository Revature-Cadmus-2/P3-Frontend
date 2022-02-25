import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { RecentActivityComponent } from './recent-activity.component';
import { DebugElement, SimpleChange } from '@angular/core';


describe('RecentActivityComponent', () => {
  let component: RecentActivityComponent;
  let fixture: ComponentFixture<RecentActivityComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentActivityComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot(
        {
          domain: 'dev-0w--5cqa.us.auth0.com',
          clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
        })]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityComponent);
    component = fixture.componentInstance;
    fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // trying to run this sometimes makes tests fail
    // component.toSource(0, "nest");

    component.ngOnChanges({
      id: new SimpleChange(null, 1, null)
    });
  });
/*
  it('should test the MANUAL execution of the OnChanges', () => {
    component.id = 4;
    component.ngOnChanges({
      id: new SimpleChange(null, component.id, null)
    });
    fixture.detectChanges();
    expect (component.message).toContain('ngOnChanges Executed');
  });*/
});
