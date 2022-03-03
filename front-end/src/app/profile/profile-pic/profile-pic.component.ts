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
    pictureLink: "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
    
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
    pictureLink: "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
    
  };
  sessionUserName= sessionStorage.getItem('username');
  userimglink ="../../../../src/assets/Profilepic.jpg";
  
  ngOnInit(): void {
    console.log(sessionUserName+'this is my sessions storage preferred username in profilepage component');
    var sessionUserName = sessionStorage.getItem('username');
    this.profileService.getUserByName(sessionUserName).then((cUser) =>{
      console.log(cUser);
      this.currentUser.pictureLink = cUser.pictureLink;
      if(this.currentUser.pictureLink ==null){
        this.currentUser.pictureLink = "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
        console.log(cUser)
      }
    });
    
    console.log(this.sessionUserName+'this is my sessions storage preferred username in profilepic');
    console.log(this.profileUser.username + "this is profileuser")
    //this is someone elses page
    if(this.auth.isAuthenticated$){
        this.auth.user$.subscribe(
        (profile) => (this.currentUser.username = sessionUserName)
        )
        console.log();
        // This is the logic to check if the user has a pic or not (to display the default image)
        this.currentRoute.params.subscribe(params => {
        this.id = params['id'];
        this.profileService.getUserById(this.id).then((result: User) => {
            this.profileUser= result;
            if(this.profileUser.pictureLink ==null){
              this.profileUser.pictureLink = "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
              console.log(this.profileUser)
            }
          });
        });
        this.auth.user$.subscribe((user) => {
          if (user?.username) {
            this.currentUser.username = sessionUserName;
          }
    })
}
}
}




// console.log(sessionUserName+'this is my sessions storage preferred username in profilepage component');
// var sessionUserName = sessionStorage.getItem('username');
// this.profileService.getUserByName(sessionUserName).then((cUser) =>{
//   //this.currentUser.pictureLink = cUser
//   console.log(cUser);
//   this.currentUser.pictureLink = cUser.pictureLink;
// });

// console.log(this.sessionUserName+'this is my sessions storage preferred username in profilepic');

// console.log(this.profileUser.username + "this is profileuser")
// if(this.auth.isAuthenticated$){
// this.auth.user$.subscribe(
// (profile) => (this.currentUser.username = sessionUserName)
// )
// console.log();

// this.currentRoute.params.subscribe(params => {
// this.id = params['id'];
// this.profileService.getUserById(this.id).then((result: User) => {
//     this.profileUser= result;
//   });
// });
// this.auth.user$.subscribe((user) => {
//   if (user?.username) {
//   // if (user?.sessionUserName) {
//     this.currentUser.username = sessionUserName;
//   }
// })
// }
// }
// }