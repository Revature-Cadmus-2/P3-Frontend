import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import { User } from '@auth0/auth0-angular';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, public profileService: ProfileService,private auth: AuthService) { }
  id = 0;

  userList:User[];
  currentUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: [],
    followers: [],
    notifications: [],
    pictureLink: ""
  };
  test = 0;

  profileUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: [],
    followers: [],
    notifications: [],
    pictureLink: ""
  };
  sessionUserName= sessionStorage.getItem('username');
  userimglink ="../../../../src/assets/Profilepic.jpg";
  
  ngOnInit(): void {
console.log(sessionUserName+'this is my sessions storage preferred username in profilepage component');
    var sessionUserName = sessionStorage.getItem('username');
    this.profileService.getUserByName(sessionUserName).then((cUser) =>{
      //this.currentUser.pictureLink = cUser
      console.log(cUser);
      this.currentUser.pictureLink = cUser.pictureLink;
    });
    
    console.log(this.sessionUserName+'this is my sessions storage preferred username in profilepic');
    
    console.log(this.profileUser.username + "this is profileuser")
if(this.auth.isAuthenticated$){
this.auth.user$.subscribe(
    (profile) => (this.currentUser.username = sessionUserName)
    )
    console.log();

    this.currentRoute.params.subscribe(params => {
    this.id = params['id'];
    this.profileService.getUserById(this.id).then((result: User) => {
        this.profileUser= result;
      });
    });
    this.auth.user$.subscribe((user) => {
      if (user?.username) {
      // if (user?.sessionUserName) {
        this.currentUser.username = sessionUserName;
      }
  })
}
}
}

//just in case
//     var sessionUserName = sessionStorage.getItem('username');
//     this.profileService.getUserByName(sessionUserName).then((cUser) =>{
//       //this.currentUser.pictureLink = cUser
//       console.log(cUser);
//       this.currentUser.pictureLink = cUser.pictureLink;
//     });
    
//     console.log(this.sessionUserName+'this is my sessions storage preferred username in profilepic');
    
//     console.log(this.profileUser.username + "this is profileuser")
// }

//new code 