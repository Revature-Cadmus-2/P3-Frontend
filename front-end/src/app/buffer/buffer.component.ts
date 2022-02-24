import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user';
import { UserCreationService } from '../service/user-creation.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css']
})
export class BufferComponent implements OnInit {
  flag: boolean = false;



  constructor(private auth: AuthService, private http: HttpClient, public _userService: UserCreationService, private router: Router) { }

  userList: User[];
  user: User = {
    username: ''
  };
  myUserName: string;

  ngOnInit(): void {
    console.log('init buffer compt');
    this.auth.user$.subscribe(profile =>
      {
        console.log(profile);
        this.user.username = profile.preferred_username;
        this._userService.userName = this.user.username;
        this._userService.getUserByName(profile.preferred_username).then((result: User) => {
          console.log('buffer component...', result);
          if (result == null)
          {
              this._userService.AddObject(this.user).then((addedUser: User) => {
              this.router.navigateByUrl('/root');
            })
          }
          else {
            this.router.navigateByUrl('/root');
          }
        })
      })
  }
}
