import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { GroupServiceService } from '../service/group-service.service';
import { Group } from '../models/Group';
import { User } from '@auth0/auth0-angular';
import { ProfileService } from '../service/profile.service';
import { UserCreationService } from '../service/user-creation.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private rService: GroupServiceService,private currentRoute: ActivatedRoute, public profileService: ProfileService, public userService: UserCreationService) { }

  allGroups: Group []= [];
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
  id=0;

  ngOnInit(): void { //this get all the list of groups for the user
    const sessionUserName = sessionStorage.getItem('username');
        console.log(sessionUserName+' this is my sessions storage preferred username in *');
        if(this.auth.isAuthenticated$){
          this.auth.user$.subscribe(
              (profile) => (this.currentUser.username = sessionUserName)
              )
              this.currentRoute.params.subscribe(params => {
              this.id = params['id'];
              this.profileService.getUserById(this.id).then((result: User) => {
                  this.profileUser= result;
                });
              });
              this.auth.user$.subscribe((user) => {
                if (user?.sessionUserName) {
                  this.currentUser.username = sessionUserName;
                }
              })      
    }

    //Our glorious attempt
    this.userService.getUserByName(sessionUserName).then((user) => 
    {
      this.currentUser.id = user.id;
    })

    this.rService.getAllGroups().then((groupArray) =>
    {
      this.allGroups = groupArray;
    }) 
    
      
  }//End ngOnInit()


  goToGroup(id: any): void
  {

    this.router.navigate([`groups/${id}`],);
  }
  
  createNewGroups(): void {
    
    this.router.navigateByUrl('create-group');
  }

  // getUserId(username: any): any {
  //   console.log("Requesting to get id by username.")
  //   this.profileService.getUserByName(username).then((user) => {
  //     this.currentUser.id = user.id
  //   })
  // }
  
}//End Class