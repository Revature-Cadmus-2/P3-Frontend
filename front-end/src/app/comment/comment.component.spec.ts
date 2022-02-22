import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RootServiceService } from '../service/root-service.service';
import { AuthModule } from '@auth0/auth0-angular';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { CommentComponent } from './comment.component';


describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let service: RootServiceService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent, DateAgoPipe],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot({
        domain: 'dev-0w--5cqa.us.auth0.com',
        clientId: '4LqYhiuu6amu7r3BOQH38phFDBycgDQB'
      })]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
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

  it('should call likeComment when up arrow is clicked', () => {

    spyOn(component, 'likeComment');

    if(component.checkIfCommentIsLiked(component.comment.votes)){
      if(component.checkIfCommentIsLikedValue(component.comment.votes)){
        let buttonEvent = fixture.debugElement.query(By.css('#upLiked'))

        buttonEvent.triggerEventHandler('click', null);

        expect(component.likeComment).toHaveBeenCalled();
      }
    }

  })

  it('should call unLikeComment when down arrow is clicked', () => {

    spyOn(component, 'unLikeComment');

    if(component.checkIfCommentIsLiked(component.comment.votes)){
      if(component.checkIfCommentIsLikedValue(component.comment.votes)){
        let buttonEvent = fixture.debugElement.query(By.css('#downLiked'))

        buttonEvent.triggerEventHandler('click', null);

        expect(component.unLikeComment).toHaveBeenCalled();
      }
    }

  });

  it('should have at least one input on the page', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length >= 1).toBeTruthy();
  });

  it('should have at least one textarea on the page', () => {
    const textarea = fixture.debugElement.queryAll(By.css('textarea'));
    expect(textarea.length >= 1).toBeTruthy();
  });

  it('should have one input with "Comment" as the value', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const nativeInput: HTMLInputElement = inputs[0].nativeElement;
    expect(nativeInput.value).toBe('Comment');
  });

  it('should have a textarea with "What are you thinking?" as the placeholder', () => {
    const textarea = fixture.debugElement.queryAll(By.css('textarea'));
    const nativeTextArea: HTMLTextAreaElement = textarea[0].nativeElement;
    expect(nativeTextArea.placeholder).toBe("What are you thinking?");
  });

  
  it('should check if a comment is liked', () => {
    const mockVote = [{
      // vote info
      id: 99,
      userName: 'Richard',
      value: 1,
      commentId: 99
    }]
    component.user = 'Richard';
    var reply = component.checkIfCommentIsLiked(mockVote);
    expect(reply == true);
    component.user = 'Blachard';
    reply = component.checkIfCommentIsLiked(mockVote);
    expect(reply == false);
  }),

  it('should check the value of a liked comment', () => {
    const mockVote = [{
      // vote info
      id: 99,
      userName: 'Richard',
      value: 1,
      commentId: 99
    }]
    component.user = 'Richard';
    var reply = component.checkIfCommentIsLikedValue(mockVote);
    expect(reply == true);
    component.user = 'Blachard';
    reply = component.checkIfCommentIsLikedValue(mockVote);
    expect(reply == false);
  })

  it('should go to userProfile', () => {
    let username = 'Hello';
    
    component.goToUserProfile(username);
    // then it goes into a service...
  })

  it('should submit', () => {
    let form: NgForm;
    component.onSubmit(form);
  })

  it('should like comments', () => {
    component.likeComment(1);
  })

  it('should unlike comments', () => {
    component.unLikeComment(1);
  })
});
