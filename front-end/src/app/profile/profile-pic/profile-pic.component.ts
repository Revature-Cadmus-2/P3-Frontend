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
    notifications: []
  };
  test = 0;

  profileUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: [],
    followers: [],
    notifications: []
  };
  sessionUserName= sessionStorage.getItem('username');
  userimglink ="https://s.hdnux.com/photos/51/50/21/10912852/3/rawImage.jpg";
  
  ngOnInit(): void {
        const sessionUserName = sessionStorage.getItem('username');
        console.log(sessionUserName+'this is my sessions storage preferred username in *****');
        this.auth.user$.subscribe(
          (profile) => (this.currentUser.username = sessionUserName)
          )
  }

  GetProfilePic(userimglink){
    var Userprofilepic = userimglink
    return Userprofilepic;
    
  }
  

}
