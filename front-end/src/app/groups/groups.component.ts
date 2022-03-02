import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { GroupServiceService } from '../service/group-service.service';
import { Group } from '../models/Group';
import { GroupMembers } from '../models/GroupMembers';
import { User } from '@auth0/auth0-angular';
import { ProfileService } from '../service/profile.service';
import { UserCreationService } from '../service/user-creation.service';
import { userInfo } from 'os';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  // gName = 'Television';

  constructor(private router: Router, public auth: AuthService, private rService: GroupServiceService,private currentRoute: ActivatedRoute, public profileService: ProfileService, public userService: UserCreationService) { }
  
  allGroups: Group []= [];
  userGroups: GroupMembers []= [];
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

  member: GroupMembers = {
    groupId: 0,
    memberUserId: 0,
    groupName: ""
  }
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

    /*Note: We had an issue with this arrow function where for no reason it didn't 
    pass and so this.currentUser.id remained default 0, we tested for a while but made
    no changes to function and it started to work on its own, cannot reproduce.*/
    console.log("Before our id code fires");
    console.log("Name is " + sessionUserName);
    //Our glorious feat to get user id, many battles were fought here for a single point of data
    this.userService.getUserByName(sessionUserName).then((user) => 
    {
      this.currentUser.id = user.id;
      // console.log("id get code fired");
      // console.log(this.currentUser.id);

    this.rService.getAllGroupsByUserId(this.currentUser.id).then((userGroup) =>
    {
      this.userGroups = userGroup;
      console.log(this.userGroups);

    })
    })
    

    this.rService.getAllGroups().then((groupArray) =>
    {
      this.allGroups = groupArray;
      console.log(this.allGroups);
    })

    
    
    
    
  }//End ngOnInit()
  
  
goToGroup(id?: any): void {
  console.log(id);
  this.router.navigate([`groups/${id}`],);
}

//   // value which can be set dynamically
// public user: {id: string, role: string} = { id:1 , role:'super_admin' };

// // on click action
// this.router.navigateByUrl('/dashboard', { state: this.user });
  
  //Group Member, Not Group
  //The purpose of this to to assign user to group
  joinGroup(groupId: any, groupName: any): void {
    this.member.memberUserId = this.currentUser.id;
    this.member.groupId = groupId;
    this.member.groupName = groupName;

    this.rService.addNewMemberToGroup(this.member)
    this.router.navigate([`groups/${groupId}`],);
  }
  
  createNewGroups(): void {

    this.router.navigateByUrl('create-group');
  }

  viewAllGroups(): void {
    
    this.router.navigateByUrl('view-groups');
  }



  // getUserId(username: any): any {
  //   console.log("Requesting to get id by username.")
  //   this.profileService.getUserByName(username).then((user) => {
  //     this.currentUser.id = user.id
  //   })
  // }
  
}//End Class