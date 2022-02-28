import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  title = 'front-end';

  constructor(public auth: AuthService) { }
  user: User = {
    username: ''
  };

  ngOnInit(): void {
    this.auth.user$.subscribe((userInfo)=> { 
      this.user.username = userInfo.preferred_username;
      if (userInfo?.preferred_username==null) {
        console.log("nothing to show")
      } else {
        console.log(userInfo?.preferred_username);
        console.log(userInfo);
        sessionStorage.setItem('username', userInfo?.preferred_username);
        const uN = sessionStorage.getItem('username');
        console.log(uN+' this is my sessions storage var');
      }
    })
  }
  saveData(){
    this.auth.user$.subscribe((userInfo)=> { 
      if (userInfo?.username==null) {
        console.log("nothing to show")
      } else {
        console.log(userInfo?.username);
        console.log(userInfo);
        sessionStorage.setItem('username', userInfo?.username);

      }
    })
  }

  getData(){
    return sessionStorage.getItem('username');
    var username = sessionStorage.getItem('username');
    console.log(username);
  }


}

