import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Root } from '../models/root';
import { AuthService } from '@auth0/auth0-angular';
import { RootServiceService } from '../service/root-service.service';
import { GroupServiceService } from '../service/group-service.service';
import { Router } from '@angular/router';
import { group } from 'console';
import { Group } from '../models/Group';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-group-post',
  templateUrl: './create-group-post.component.html',
  styleUrls: ['./create-group-post.component.css']
  
})
export class CreateGroupPostComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private rService: RootServiceService, private gService: GroupServiceService, private currentRoute: ActivatedRoute, private toastr: ToastrService) { }

  root: Root = {
    id: 0,
    title: '',
    message: '',
    totalVote: 0,
    dateTime: new Date(0), //may have to remove '0' from new Date
    userName: '',
    groupPostId: 1,
    comments: [],

  }
  currentPostGroupId = 0;
  id = 0;
  
  currentGroup: Group = {
    id: 0,
    createdByUserId: 0,
    groupName: '',
    message: '',
    dateTime: new Date(0),
  }
  group: Group = {
    createdByUserId: 0,
    groupName: "",
    message: "",
    dateTime: new Date()
  };

  ngOnInit(): void {
  
    this.currentRoute.params.subscribe(params => {
      this.currentPostGroupId = +params['id'];
      this.root.groupPostId = this.currentPostGroupId;
      
      this.gService.getGroupById(this.currentPostGroupId).then((result: Group) => {
        this.group = result;
      })
    })
  }

  //$ is shortcut to document.getElementById() basically
  onSubmit(postForm: NgForm){ //grabs the route for group's profile
    this.auth.user$.subscribe((user) => {
      if (user?.preferred_username) {
        this.root.userName = user.preferred_username;
      }
      this.root.dateTime = new Date();
      
      this.rService.addRoot(this.root).then(res => {
            this.toastr.success( 'You Successfully Created a Post','Post Notification', {
              timeOut: 2000,
            } );

      this.router.navigateByUrl(`groups/${this.root.groupPostId}`);
      })
    })
  }
}