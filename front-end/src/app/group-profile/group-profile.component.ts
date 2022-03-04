import { Component, OnInit, Input } from '@angular/core';
import { GroupServiceService } from '../service/group-service.service';
import { RootServiceService } from '../service/root-service.service';
import { Group } from '../models/Group';
import { Root } from '../models/root';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { Vote } from '../models/vote';


@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit {

  constructor(private router: Router, private currentRoute: ActivatedRoute, private gService: GroupServiceService, private rService: RootServiceService ) { }

  profileName: any;

  id = 0;

  root: Root[] =[];

  group: Group = {
    createdByUserId: 0,
    groupName: "",
    message: "",
    dateTime: new Date()
  };

  voteCounter: number = 0;
  rootVoteCounter: number = 0;
  isLoaded = false;
  roots: Root[] = [];
  votes: Vote[] = [];

  vote: Vote = {
    id: 0,
    userName: '',
    value: 0,
    commentId: 0
  }

ngOnInit(): void {  
this.currentRoute.params.subscribe(params => {
  this.id = params['id'];
    
  this.gService.getGroupById(this.id).then((result: Group) => {
    this.group = result;
  })

  this.rService.getRootByGroupId(this.id).then((groupPosts) => { //groupPosts contain all the post for that id
    groupPosts.sort((a, b) => (a.dateTime < b.dateTime) ? 1 : -1);
    this.root = groupPosts;
  })
  
})
  
}//End OnInit
  
//The purpose of this is to create new posts
goToCreatePost(id: number): void {
  this.router.navigateByUrl(`${id}/create-group-post`);
} 

//The purpose of this is to return to all groups
goBack(id: number): void {
  this.router.navigateByUrl('/groups');
} 

}