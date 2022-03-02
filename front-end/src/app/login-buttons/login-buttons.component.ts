import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserCreationService } from '../service/user-creation.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.css']
})
export class LoginButtonsComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, public userService: UserCreationService, private toast : NgToastService) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe(
        (profile) => (this.userService.userName = profile.preferred_username))
        //this.toast.success({detail:'Success Message',summary:'You have successfully logged in!',duration:10000});
    }
  }
  Logoutfunc() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
