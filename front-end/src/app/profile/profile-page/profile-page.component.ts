import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [ProfileService]
})

export class ProfilePageComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, public profileService: ProfileService, private router: Router, private auth: AuthService) { }
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

  ngOnInit(): void {
    if(this.auth.isAuthenticated$){
      this.auth.user$.subscribe(
        (profile) => (this.currentUser.username = profile.preferred_username)
        )
        this.currentRoute.params.subscribe(params => {
          this.id = params['id'];
    
          this.profileService.getUserById(this.id).then((result: User) => {
            this.profileUser= result;
          });
        });
        this.auth.user$.subscribe((user) => {
          if (user?.preferred_username) {
            this.currentUser.username = user.preferred_username;
          }
      })
    }
  }
}
