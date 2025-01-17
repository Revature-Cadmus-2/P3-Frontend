import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { AuthService } from '@auth0/auth0-angular';
import { Followings } from 'src/app/models/Followings';
import { FollowedBy } from 'src/app/models/FollowedBy';
import { User } from 'src/app/models/user';
import { LogicalProjectPath } from '@angular/compiler-cli/src/ngtsc/file_system';



@Component({
  selector: 'app-book-mark-button',
  templateUrl: './book-mark-button.component.html',
  styleUrls: ['./book-mark-button.component.css']
})
export class BookMarkButtonComponent implements OnInit {
  isFollow = false;
  isFollower = false;
  //followingId = 0;
  @Input() follower: Followings;
  @Input() followedingby: FollowedBy;
  @Input() followId = 0;
  @Input() followedById = 0;
  @Output() toggle = new EventEmitter<boolean>();

  //For the people following the user.
  followedby : FollowedBy = { 
    id: 0,
    followersId: 0,
    userId: 0,
    followersUserName: ''
  };

  followedUser: Followings = {
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
    followings: [],
    followers: [],
    notifications: []
  };

  userFollowed: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: [],
    followers: [],
    notifications: []
  }

  followingUser: FollowedBy = {
    id: 0,
    userId: 0,
    followersId: 0,
    followersUserName: ""
  }

  constructor(private profileService: ProfileService, public auth: AuthService,) { }

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
              //shows list of who you are following so that on click it knows if its true or false,
              //and updates your list
              let listOfFollowings = this.currentUser.followings;
              for(let i = 0; i < listOfFollowings.length; i++){
                if (listOfFollowings[i].followingUserId == this.followId){
                  this.isFollow = true;
                  this.followedUser=listOfFollowings[i];
                  break;
                  }
                }
                //does the same thing as before but for the followers list for who you are following
                this.profileService.getFollowersByUserId(this.followId).then((resulting: FollowedBy[]) => {
                  let listofFollowers = resulting;
                  //let listofFollowers = this.userFollowed.followers;
                  for(let i = 0; i < listofFollowers.length; i++){
                    if(listofFollowers[i].followersId == this.currentUser.id){
                      this.isFollower = true;
                      this.followingUser=listofFollowers[i];
                      console.log(this.followingUser)
                      break;
                    }
                  }
                })
          });
        }
      })
    }
  
  }


  ngOnChanges(){
    this.isFollow= false;
    this.ngOnInit();
    }

  checkFollows(follows:Followings[]): Followings{
    for(let i = 0; i < follows.length; i++){
      if (follows[i].followingUserId == this.followId){
        this.isFollow = true;
        var followedUser=follows[i];
        break;
        }
      return followedUser;
      }
      return followedUser;
  }

  checkFollowers(currFollower:FollowedBy[]): FollowedBy{
    for(let i = 0; i < currFollower.length; i++){
      if(currFollower[i].followersId == this.followId){
        this.isFollower = true;
        var followingUser =currFollower[i];
        break;
      }
      return followingUser;
    }
    return followingUser;
  }

  onClick(): void  {
    this.isFollow = !this.isFollow;
    if(this.isFollow){
      this.profileService.getUserById(this.followId).then((result: User) => {
      this.followedUser.followerUserId=this.currentUser.id;
      this.followedUser.followingUserId=this.followId;
      this.followedUser.followingUserName=result.username
      this.profileService.followUser(this.followedUser).subscribe(
        data => {
          this.isFollow = true;
          this.ngOnInit();
        }
      );
    })

     //Notification for displaying when you follow someone. Garrett
    } else if (!this.isFollow) {
      this.profileService.unfollowUser(this.followedUser.id).subscribe(
        data => {
          this.isFollow = false;
          this.ngOnInit();
          this.followedUser.id=0,
          this.followedUser.followerUserId=0,
          this.followedUser.followingUserId=0,
          this.followedUser.followingUserName=''
          
        }
      );

    }
    
    //When you follow someone this is how their Follower list gets updated
    this.isFollower = !this.isFollower;
    if(this.isFollower){
      this.profileService.getUserById(this.followId).then((result: User) => {
      this.followingUser.userId=this.followId;
      this.followingUser.followersId=this.currentUser.id;
      this.followingUser.followersUserName=this.currentUser.username;
      this.profileService.userFollowers(this.followingUser);
      this.isFollower = true;
    })
    } else if (!this.isFollower){
      this.profileService.getFollowersByUserId(this.followId).then((result: FollowedBy[]) => {
        console.log('user unfollowed in follower list')
        let listofFollowers = result;
        console.log(result);
        for(let i = 0; i < listofFollowers.length; i++){
          if(listofFollowers[i].userId == this.followId){
            this.profileService.userUnFollower(listofFollowers[i].id);
            console.log(listofFollowers[i].id)
            console.log('this is the followedby id')
            break;
          }
        }
      })
      this.isFollower == false;
    }
    this.isFollower = !this.isFollower;
    //currently ?? idk if im doing it right LOL
    if(this.isFollower){
      this.profileService.getUserById(this.followId).then((result: User) => {
      this.followingUser.userId=this.followId;
      this.followingUser.followersId=this.currentUser.id;
      this.followingUser.followersUserName=this.currentUser.username;
      this.profileService.userFollowers(this.followingUser);
      this.isFollower = true;
    })
    } else if (!this.isFollower){
      this.profileService.getFollowersByUserId(this.followId).then((result: FollowedBy[]) => {
        console.log('user unfollowed in follower list')
        let listofFollowers = result;
        console.log(result);
        for(let i = 0; i < listofFollowers.length; i++){
          if(listofFollowers[i].userId == this.followedById){
            this.profileService.userUnFollower(listofFollowers[i].id);
            console.log(listofFollowers[i].id)
            break;
          }
        }
      })
      this.isFollower == false;
    }
  }
  
}
