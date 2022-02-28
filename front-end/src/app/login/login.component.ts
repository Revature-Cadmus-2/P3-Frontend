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
