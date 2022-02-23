import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  isDarkMode: boolean;

  constructor(public auth: AuthService, private themeService: ThemeService) { }
  
  toggleDarkMode(){
    this.isDarkMode = this.themeService.isDarkMode();
    if (this.isDarkMode) {
      this.themeService.update('light-mode');
    } else {
      this.themeService.update('dark-mode');
    }
  }
}