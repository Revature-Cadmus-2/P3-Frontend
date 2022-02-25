import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { GroupServiceService } from '../service/group-service.service';
import { Group } from '../models/Group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private rService: GroupServiceService) { }

  allGroups: Group []= [];

  ngOnInit(): void { //this get all the list of groups for the user
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
    console.log("Requesting to create new group.")
    this.router.navigateByUrl('create-group');
  }
}//End Class