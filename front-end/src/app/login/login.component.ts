import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserCreationService } from '../service/user-creation.service';
import { userInfo } from 'os';
import { User } from "../models/user";
import { NgToastService } from 'ng-angular-popup';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, public userService: UserCreationService, private toast : NgToastService) { }

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
    // login success notification
    this.toast.info({detail:'Info Message',summary:'Logging you in... !',duration:10000});
  }

  Registerfunc(){
    this.auth.loginWithRedirect({ screen_hint: 'signup', appState: { target: '/buffer' } });
    this.toast.info({detail:'Info Message',summary:'Registering... !',duration:10000});
    
  }

  Logoutfunc(){
    this.auth.logout({ returnTo: this.doc.location.origin });
    this.toast.info({detail:'Info Message',summary:'Logging you out... !',duration:10000});
  }
}
