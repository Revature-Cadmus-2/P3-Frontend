import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../models/Group';
import { AuthService } from '@auth0/auth0-angular';
import { GroupServiceService } from '../service/group-service.service';
import { User } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../service/profile.service';
import { UserCreationService } from '../service/user-creation.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  
  constructor(private router: Router, public auth: AuthService, private rService: GroupServiceService, private currentRoute: ActivatedRoute, public profileService: ProfileService, public userService: UserCreationService) { }

  group: Group = {
    id: 0,
    createdByUserId: 0,
    groupName: '',
    message: '',
    dateTime: new Date() //we removed the 0 to allow for current date to show up
  }

  sessionUserName = sessionStorage.getItem('username');
  profileUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: [],
    followers: [],
    notifications: []
  };
  
  currentUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: [],
    followers: [],
    notifications: []
  };
  id=1;


  ngOnInit(): void {
    const sessionUserName = sessionStorage.getItem('username');
        if(this.auth.isAuthenticated$)
        {

          this.auth.user$.subscribe((profile) => (this.currentUser.username = sessionUserName))

          this.currentRoute.params.subscribe(params => {
          this.id = params['id'];
          this.profileService.getUserById(this.id).then((result: User) => {
              this.profileUser= result;
            });
          });

          this.auth.user$.subscribe((user) => 
          {
            if (user?.sessionUserName)
            {
              this.currentUser.username = sessionUserName;
            }
          })

        }//End isAuthenticated

        this.userService.getUserByName(sessionUserName).then((user) => 
        {
          this.currentUser.id = user.id; 
        })
  }//End ngOnInit()


  onSubmit(groupForm: NgForm) {
    
      this.group.createdByUserId = this.currentUser.id      
      // this.group.dateTime = new Date()
      
      this.rService.createGroup(this.group).then(res => {
        this.router.navigateByUrl('groups');
      })
    
  }

}

