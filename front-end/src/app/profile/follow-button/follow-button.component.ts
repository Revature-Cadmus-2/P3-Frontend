import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { AuthService } from '@auth0/auth0-angular';
import { Followings } from 'src/app/models/Followings';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})

export class FollowButtonComponent implements OnInit {
  isFollow = false;
  followingId = 0;
  @Input() follower: Followings;
  @Input() id = 0;
  @Output() toggle = new EventEmitter<boolean>();

  follows: Followings = {
    id: 0,
    followerUserId: 0,
    followingUserId: 0,
    followingUserName: ''
  };

  currentUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: []
  }; 

  constructor(private profileService: ProfileService, public auth: AuthService) { }

  ngOnInit(): void { 
    if(this.auth.isAuthenticated$){
      this.auth.user$.subscribe(
        (profile) => (this.currentUser.username = profile.preferred_username)
        )
        
        this.auth.user$.subscribe((user) => {
          if (user?.preferred_username) {
          this.currentUser.username = user.preferred_username;
          this.profileService.getUserByName(this.currentUser.username).then((result: User) => {
            this.currentUser= result;
            console.log(this.currentUser)
          });
        }
      })
    }
  }
  
  onClick(): void {
    this.isFollow = !this.isFollow;
    if(this.isFollow == true){
      console.log(this.isFollow);
      console.log(this.id);
      this.profileService.followUser(this.follows).subscribe(
        data => {
          this.isFollow = true;
          this.toggle.emit(false);
        }
      );
    } else if (this.isFollow == false) {
      console.log(this.isFollow);
      console.log(this.id);
      this.profileService.unfollowUser(this.follows).subscribe(
        data => {
          this.isFollow = false;
          this.toggle.emit(true);
        }
      );
    }
  }
}