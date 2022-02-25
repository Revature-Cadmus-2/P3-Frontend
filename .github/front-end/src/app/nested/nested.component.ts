import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../models/Comment';
import { RootServiceService } from '../service/root-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { Vote } from '../models/vote';
import { Root } from '../models/root';

@Component({
  selector: 'app-nested',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.css']
})
export class NestedComponent implements OnInit {

  constructor(public router: Router, private currentRoute: ActivatedRoute, public rootService: RootServiceService, public auth: AuthService, private cdr: ChangeDetectorRef) { }

  id = 0;
  user: string = '';
  counter: number = 0;
  status: boolean = false;
  liked: boolean = false;
  comments: Comment[] = [];

  comment: Comment = {
    parentId: 0,
    rootId: 0,
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    votes: [],
    comments: []
  }

  root: Comment = {
    parentId: 0,
    rootId: 0,
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    votes: [],
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

      this.rootService.getCommentById(this.id).then((result: Comment) => {
        this.root = result;
        this.root.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)
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
        this.comment.parentId = params['id'];
      })

      this.comment.dateTime = new Date();
      this.comment.rootId = this.root.rootId;

      this.rootService.addComment(this.comment).then(res => {
        alert("Comment successfully created")
        location.reload()
      })
    })
  }

  deleteComment(id: number) {
    this.rootService.deleteComment(id).then(res => {
      location.reload()
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
    console.log(this.user)
    this.rootService.getCommentById(id).then(result => {
      console.log(result)
      if (result.votes.length !== 0) {
        for (let vote of result.votes) {
          if (vote.userName === this.user) {
            if (vote.value === 1) {
              this.status = true
              this.rootService.deleteVote(vote.id).then(res => {
                this.currentRoute.params.subscribe(params => {
                  this.id = params['id'];
            
                  this.rootService.getCommentById(this.id).then((result: Comment) => {
                    this.root = result;
                    result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)
                    console.log(result)

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
                console.log("Vote added")

                this.currentRoute.params.subscribe(params => {
                  this.id = params['id'];
            
                  this.rootService.getCommentById(this.id).then((result: Comment) => {
                    this.root = result;
                    result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)
                    console.log(result)

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
          console.log("Reached here too")
          this.vote.value = 1
          this.vote.userName = this.user
          this.vote.commentId = id

          this.rootService.addVote(this.vote).then(res => {
            console.log("Vote added")

            this.currentRoute.params.subscribe(params => {
              this.id = params['id'];
        
              this.rootService.getCommentById(this.id).then((result: Comment) => {
                this.root = result;
                result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)
                console.log(result)

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

        this.status = false
      })
  }

  unLikeComment(id: number) {
    console.log(this.user)
    this.rootService.getCommentById(id).then(result => {
      if (result.votes.length !== 0) {
        for (let vote of result.votes) {
          if (vote.userName === this.user) {
            if (vote.value === -1) {
              this.status = true
              this.rootService.deleteVote(vote.id).then(res => {
                this.currentRoute.params.subscribe(params => {
                  this.id = params['id'];
            
                  this.rootService.getCommentById(this.id).then((result: Comment) => {
                    this.root = result;
                    result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)
                    console.log(result)
    
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
                console.log("Vote added")

                this.currentRoute.params.subscribe(params => {
                  this.id = params['id'];
            
                  this.rootService.getCommentById(this.id).then((result: Comment) => {
                    this.root = result;
                    result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)
                    console.log(result)
    
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
          console.log("Reached here too")
          this.vote.value = -1
          this.vote.userName = this.user
          this.vote.commentId = id

          this.rootService.addVote(this.vote).then(res => {
            console.log("Vote added")

            this.currentRoute.params.subscribe(params => {
              this.id = params['id'];
        
              this.rootService.getCommentById(this.id).then((result: Comment) => {
                this.root = result;
                result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1)
                console.log(result)

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

      this.status = false
    })
  }

}
