import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [ProfileService]
})
export class ProfilePageComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, public profileService: ProfileService, private router: Router) { }

  id = 0;

  currentUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followedUsers: []
  }; 
  public isFollow: boolean = false;


  ngOnInit(): void {
    this.currentRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);

      this.profileService.getUserById(this.id).then((result: User) => {
        this.currentUser= result;
        console.log("followed user" + this.currentUser.followedUsers[1]);
      });
    });
    
    
  //   this.profileService.getAll();
  }
  onClick() {
    this.isFollow = !this.isFollow;
  }

}
