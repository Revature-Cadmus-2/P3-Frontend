import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserCreationService } from '../service/user-creation.service';
import { ProfileService } from 'src/app/service/profile.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  username="";
  userId=  0;

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, public userService: UserCreationService, public profileService: ProfileService) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated$)
    {
      this.auth.user$.subscribe(
        (profile) => (this.userService.userName = profile.preferred_username))

      this.auth.user$.subscribe((user) => {
        if (user?.preferred_username) {
          this.username = user.preferred_username;
          this.profileService.getUserByName(this.username).then((result: User) => {
          this.userId= result.id;
          });
        }
      })
    }
    
  }

  Registerfunc(){
    this.auth.loginWithRedirect({ screen_hint: 'signup', appState: { target: '/' } });
  }

}
