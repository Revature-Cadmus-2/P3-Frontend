import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserCreationService } from '../service/user-creation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, public userService: UserCreationService) { }

  ngOnInit(): void {
    //empty on purpose
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
