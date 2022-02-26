import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserCreationService } from '../service/user-creation.service';
import { userInfo } from 'os';
import { User } from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, public userService: UserCreationService) { }

  user: User = {
    username: ''
  };

  ngOnInit(): void {
    // this.auth.user$.subscribe((userInfo)=> { 
    //   this.user.username = userInfo.preferred_username;
    //   if (userInfo?.preferred_username==null) {
    //     console.log("nothing to show")
    //   } else {
    //     console.log(userInfo?.preferred_username);
    //     console.log(userInfo);
    //     sessionStorage.setItem('username', userInfo?.preferred_username);
    //     const uN = sessionStorage.getItem('username');
    //     console.log(uN+' this is my sessions storage var');
    //   }
    // })
  }


  Loginfunc(){
    this.auth.loginWithRedirect({ appState: { target: '/buffer' } });
  }

  Registerfunc(){
    this.auth.loginWithRedirect({ screen_hint: 'signup', appState: { target: '/buffer' } });
  }

  Logoutfunc(){
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
