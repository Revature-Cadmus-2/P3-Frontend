
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user';
import { FollowingPost } from '../models/FollowingPost';
import { RootServiceService } from '../service/root-service.service';
import { Post } from '../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-button-root',
  templateUrl: './follow-button-root.component.html',
  styleUrls: ['./follow-button-root.component.css']
})

export class FollowButtonRootComponent implements OnInit {

  @Input() id = 0;
  @Output() toggle = new EventEmitter<boolean>();


  followingId = 0;
  postname = "";
  isFollow = false;
  newFollowing: FollowingPost ={
    postname: '',
    rootId: 0,
    userId: 0
  };

  currentUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: []
  }; 
  constructor(public profileService: ProfileService, public auth: AuthService, public rootService: RootServiceService, public router: Router ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated$)
    {
      this.auth.user$.subscribe(
        (profile) => (this.currentUser.username = profile.preferred_username))

      this.auth.user$.subscribe((user) => {
      //   if (user?.preferred_username) {
      //     this.currentUser.username = user.preferred_username;
      //     this.profileService.getUserByName(this.currentUser.username).then((result: User) => {
      //       this.currentUser= result;
            
      //   // this.isFollow = this.profileService.checkFollowingPost(this.id, this.currentUser.id);
      //   this.profileService.getFollowedPostByUserId(this.currentUser.id).then((result: FollowingPost[]) => {
      //     let listOfFollowings = result;
      //     for(let i = 0; i < listOfFollowings.length; i++){
      //       if (listOfFollowings[i].rootId == this.id){
      //         this.isFollow = true;
              
      //         this.followingId=listOfFollowings[i].id;
      //         break;
      //       }
      //     }
      //   })    
      //     });
      //   }
      })
    }  
  }

  ngOnChanges(
  ){  }
  
  onClick() {
    if(this.isFollow== false){
      this.rootService.getRootById(this.id).then((result: Post) => {
        this.newFollowing.postname= result.title;
        this.newFollowing.rootId= this.id;
        this.newFollowing.userId= this.currentUser.id;
        this.profileService.followPost(this.newFollowing);
        
      this.isFollow=true;
      });
      };
      if(this.isFollow == true){
      
        this.profileService.getFollowedPostByUserId(this.currentUser.id).then((result: FollowingPost[]) => {
          let listOfFollowings = result;
          for(let i = 0; i < listOfFollowings.length; i++){
            if (listOfFollowings[i].rootId == this.id){
              this.profileService.unfollowPost(listOfFollowings[i].id);
              break;
            }
          }
        })    
        
        this.isFollow=false;
      }  
    };

  }
