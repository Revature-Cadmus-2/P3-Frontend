import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../models/Group';
import { AuthService } from '@auth0/auth0-angular';
import { GroupServiceService } from '../service/group-service.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  
  constructor(private router: Router, public auth: AuthService, private rService: GroupServiceService) { }

  group: Group = {
    id: 0,
    createdByUserId: 0,
    groupName: '',
    message: '',
    dateTime: new Date() //we removed the 0 to allow for current date to show up
  }


  ngOnInit(): void {
  }

  onSubmit(groupForm: NgForm) {
    this.auth.user$.subscribe((user) => {
      if(user.id) {
        this.group.createdByUserId = user.id
      }
      console.log(this.group);
      
      // this.group.dateTime = new Date()
      
      this.rService.createGroup(this.group).then(res => {
        console.log("Your group has been created")
        this.router.navigateByUrl('groups');
      })
    })
  }

}
