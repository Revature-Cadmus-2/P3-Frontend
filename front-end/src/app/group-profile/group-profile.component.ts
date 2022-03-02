import { Component, OnInit, Input } from '@angular/core';
import { GroupServiceService } from '../service/group-service.service';
import { Group } from '../models/Group';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit {

  constructor(private router: Router, private currentRoute: ActivatedRoute, private rService: GroupServiceService, ) { }

  theName: Group;
  profileName: any;
  id = 0;
  //root: Root[] =[];
  group: Group = {
    createdByUserId: 0,
    groupName: "",
    message: "",
    dateTime: new Date()
  };

ngOnInit(): void {
  // this.location.getState() = this.theName
  console.log("Here is the part where we added the get root data");
  
  this.currentRoute.params.subscribe(params => {
    this.id = params['id'];
    console.log(this.id);
    
    this.rService.getGroupById(this.id).then((result: Group) => {
      this.group = result;
      console.log(this.group);
  })
})
}

  

goToCreatePost(id: number): void {
  console.log(id);
  this.router.navigateByUrl(`${id}/create-group-post`);
}
// goToCreatePost(): void {
//   this.router.navigateByUrl('create-group-post');
// }

// goToGroup(id?: any): void {
//   console.log(id);
//   this.router.navigate([`groups/${id}`],);
// }
  

}