import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NestedComponent } from './nested.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Comment } from '../models/Comment';


describe('NestedComponent', () => {
  let component: NestedComponent;
  let fixture: ComponentFixture<NestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NestedComponent],
      imports: [RouterModule, FormsModule, RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot(
        {
          domain: 'dev-0w--5cqa.us.auth0.com',
          clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
        }
      )]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');

    let form = fixture.debugElement.query(By.css('form'))

    form.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
  })

  it('should pull a list of nested comments', (done) => {
    component.id =0;
    let fakeComment: Comment = {
      id: 1,
      message: "We's still walkin' a ducky!",
      totalVote: 32,
      dateTime: null,
      userName: "Zoe",
      parentId: -1,
      rootId: -1,
      votes: [],
      comments: [
        {
            id: 1,
            message: "Wah wah I don't wanna test",
            totalVote: -67,
            dateTime: null,
            userName: "Brian",
            parentId: 1,
            rootId: 1,
            votes: [],
            comments: [],
          },
          {
              id: 2,
              message: "I'll do it for you little buddy",
              totalVote: 200,
              dateTime: null,
              userName: "Justin",
              parentId: 1,
              rootId: 1,
              votes: [],
              comments: [],
            }
      ],
    }
    
    let spyOne = spyOn(component.rootService, "getCommentById").and.returnValue(Promise.resolve(fakeComment));
    component.ngOnInit();
    spyOne.calls.mostRecent().returnValue.then(res => {
      fixture.detectChanges();
      expect(spyOne).toHaveBeenCalled();
      expect(component.root.comments[0].userName).toEqual("Justin");
      expect(res.userName).toEqual("Zoe");
      done();
    })
  });

});