import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ThemeService } from './service/theme.service';
import { User } from 'src/app/models/user';
import { NgToastService } from 'ng-angular-popup';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  isDarkMode: boolean;

  constructor(public auth: AuthService, private themeService: ThemeService) { }
  
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
  
  toggleDarkMode(){
    this.isDarkMode = this.themeService.isDarkMode();
    if (this.isDarkMode) {
      this.themeService.update('light-mode');
    } else {
      this.themeService.update('dark-mode');
    }
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
