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

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(public profileService: ProfileService, public router: Router, private currentRoute: ActivatedRoute, public rootService: RootServiceService, private cdr: ChangeDetectorRef, public auth: AuthService) { }

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
    comments: []
  }

  vote: Vote = {
    id: 0,
    userName: '',
    value: 0,
    commentId: 0
  }

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
        this.comment.userName = user.preferred_username
      }

      this.currentRoute.params.subscribe(params => {
        this.comment.rootId = params['id'];
      })

      this.comment.dateTime = new Date();
      this.comment.parentId = -1;

      this.rootService.addComment(this.comment).then(res => {
        alert("Comment successfully created")
        location.reload()
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
