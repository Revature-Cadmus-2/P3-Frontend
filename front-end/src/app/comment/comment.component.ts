import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Root } from '../models/root';
import { Comment } from '../models/Comment';
import { RootServiceService } from '../service/root-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { Vote } from '../models/vote';
import { User } from '../models/user';
import { ProfileService } from '../service/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Notification } from '../models/Notifications';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field"

import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(public profileService: ProfileService, public router: Router, private currentRoute: ActivatedRoute, public rootService: RootServiceService, private cdr: ChangeDetectorRef, public auth: AuthService, private toastr: ToastrService, private toast : NgToastService) { }

  id = 0;
  user: string = '';
  counter: number = 0;
  status: boolean = false;
  liked: boolean = false;
  comments: Comment[] = [];

  comment: Comment = {
    id: 0,
    parentId: 0,
    rootId: 0,
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    votes: [],
    comments: []
  }

  root: Root = {
    id: 0,
    title: '',
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    comments: [],
    groupPostId: 0
  }

  vote: Vote = {
    id: 0,
    userName: '',
    value: 0,
    commentId: 0
  }

  postNotification: Notification = {
    id: 0,
    userId: 0,
    FollowersId: 0,
    postId: 0,
    commentId: 0,
    message: ''
  };

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user?.preferred_username) {
        this.user = user.preferred_username
      }
    })

    this.currentRoute.params.subscribe(params => {
      this.id = params['id'];

      this.rootService.getRootById(this.id).then((result: Root) => {
        this.root = result;
        result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)

        for (let comment of this.root.comments) {
          comment.totalVote = 0;
          this.counter = 0;
          for (let vote of comment.votes) {
            this.counter = this.counter + vote.value;
          }
          comment.totalVote = this.counter;
        }
      })
    })
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  onSubmit(postForm: NgForm) {

    this.auth.user$.subscribe((user) => {
      if (user?.preferred_username) {
        this.comment.userName = user.preferred_username;
        this.currentRoute.params.subscribe(params => {
        this.id = params['id'];
        this.rootService.getRootById(this.id).then((result: Root) => {
          this.root = result;
        })
      })
      }

      this.currentRoute.params.subscribe(params => {
        this.comment.rootId = params['id'];
      })

      let nDate = new Date();
      // let dateZone = new Intl.DateTimeFormat("en-US", {timeZone: "America/New_York"});
      this.comment.dateTime = new Date(nDate.toLocaleString("en-US", {timeZone: 'America/New_York'}));
      this.comment.parentId = -1;
      
      this.rootService.addComment(this.comment).then(res => {
      //  alert("Comment successfully created")
      // this.toastr.success( 'You Successfully Commented','Comment Notification', {
      //   timeOut: 2000,
      // } ); //Notification for displaying Successfully Commented. GM
        //alert("Comment successfully created")
        this.toast.success({detail:'Success Message',summary:'Comment successfully created!',duration:10000});
        
        //This gets notifications for when someone comments on your post and then it refreshes the page so the comment is shown
        this.profileService.getUserByName(this.root.userName).then((resulting: User) => {
          this.profileService.getUserByName(this.comment.userName).then((thisUser: User) => {
            console.log(resulting);
            this.postNotification.userId = resulting.id;
            this.postNotification.FollowersId= thisUser.id;
            this.postNotification.postId = this.id;
            this.postNotification.commentId = this.comment.id;
            this.postNotification.message = ` ${this.comment.userName} has commented on your "${this.root.title}" post`;
            console.log(this.postNotification.message)
            this.profileService.addNotification(this.postNotification);
            location.reload()
          })
        })
      })
      
    })
  }

  checkIfCommentIsLiked(votes: Vote[]): boolean {
    if (votes.findIndex((item) => item.userName === this.user) >= 0) {
      this.liked = true
    }
    else {
      this.liked = false
    }
    return this.liked
  }

  checkIfCommentIsLikedValue(votes: Vote[]): boolean {
    if (votes.findIndex((item) => item.userName === this.user && item.value === 1) >= 0) {
      this.liked = true
    }
    else {
      this.liked = false
    }
    return this.liked
  }

  likeComment(id: number) {
    this.rootService.getCommentById(id).then(result => {
      if (result.votes.length !== 0) {
        for (let vote of result.votes) {
          if (vote.userName === this.user) {
            if (vote.value === 1) {
              this.status = true
              this.rootService.deleteVote(vote.id).then(res => {
                this.currentRoute.params.subscribe(params => {
                  this.id = params['id'];

                  this.rootService.getRootById(this.id).then((result: Root) => {
                    this.root = result;
                    result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)

                    for (let comment of this.root.comments) {
                      comment.totalVote = 0;
                      this.counter = 0;
                      for (let vote of comment.votes) {
                        this.counter = this.counter + vote.value;
                      }
                      comment.totalVote = this.counter;
                    }
                  })
                })
              })
            }
            else if (vote.value === -1) {
              this.status = true
              vote.value = 1

              this.rootService.updateVote(vote).then(res => {

                this.currentRoute.params.subscribe(params => {
                  this.id = params['id'];

                  this.rootService.getRootById(this.id).then((result: Root) => {
                    this.root = result;
                    result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)

                    for (let comment of this.root.comments) {
                      comment.totalVote = 0;
                      this.counter = 0;
                      for (let vote of comment.votes) {
                        this.counter = this.counter + vote.value;
                      }
                      comment.totalVote = this.counter;
                    }
                  })
                })
              })
            }
            else {
              this.status = false;
            }

          }
        }
      }

        if(this.status === false){
          this.vote.value = 1
          this.vote.userName = this.user
          this.vote.commentId = id

          this.rootService.addVote(this.vote).then(res => {

            this.currentRoute.params.subscribe(params => {
              this.id = params['id'];

              this.rootService.getRootById(this.id).then((result: Root) => {
                this.root = result;
                result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)

                for(let comment of this.root.comments){
                  comment.totalVote = 0;
                  this.counter = 0;
                  for(let vote of comment.votes){
                    this.counter = this.counter + vote.value;
                  }
                  comment.totalVote = this.counter;
                }
              })
            })
          })
        }

        this.status = false
      })
  }

  goToUserProfile(username: string): void {
    this.profileService.getUserByName(username).then((result: User) => {
      let userId = result.id;
      this.router.navigateByUrl('profile/' + userId);
    });
  }

  unLikeComment(id: number) {
    this.rootService.getCommentById(id).then(result => {
      if (result.votes.length !== 0) {
        for (let vote of result.votes) {
          if (vote.userName === this.user) {
            if (vote.value === -1) {
              this.status = true
              this.rootService.deleteVote(vote.id).then(res => {
                this.currentRoute.params.subscribe(params => {
                  this.id = params['id'];

                  this.rootService.getRootById(this.id).then((result: Root) => {
                    this.root = result;
                    result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)

                    for (let comment of this.root.comments) {
                      comment.totalVote = 0;
                      this.counter = 0;
                      for (let vote of comment.votes) {
                        this.counter = this.counter + vote.value;
                      }
                      comment.totalVote = this.counter;
                    }
                  })
                })
              })
            }
            else if (vote.value === 1) {
              this.status = true
              vote.value = -1

              this.rootService.updateVote(vote).then(res => {

                this.currentRoute.params.subscribe(params => {
                  this.id = params['id'];

                  this.rootService.getRootById(this.id).then((result: Root) => {
                    this.root = result;
                    result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)

                    for (let comment of this.root.comments) {
                      comment.totalVote = 0;
                      this.counter = 0;
                      for (let vote of comment.votes) {
                        this.counter = this.counter + vote.value;
                      }
                      comment.totalVote = this.counter;
                    }
                  })
                })
              })
            }
            else {
              this.status = false;
            }
          }
        }
      }
      if(this.status === false){
        this.vote.value = -1
        this.vote.userName = this.user
        this.vote.commentId = id

        this.rootService.addVote(this.vote).then(res => {

          this.currentRoute.params.subscribe(params => {
            this.id = params['id'];

            this.rootService.getRootById(this.id).then((result: Root) => {
              this.root = result;
              result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)

              for(let comment of this.root.comments){
                comment.totalVote = 0;
                this.counter = 0;
                for(let vote of comment.votes){
                  this.counter = this.counter + vote.value;
                }
                comment.totalVote = this.counter;
              }
            })
          })
        })
      }

      this.status = false
    })
  }

  deleteComment(id: number) {
    this.rootService.deleteComment(id).then(res => {
      location.reload()
    })
  }
}
