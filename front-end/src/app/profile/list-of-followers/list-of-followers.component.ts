import { Component, OnInit, Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-list-of-followers',
  templateUrl: './list-of-followers.component.html',
  styleUrls: ['./list-of-followers.component.css']
})
export class ListOfFollowersComponent implements OnInit {
  @Input() id = 0;
  @Input() list!: number[];
  nameList!: string[];
  

  constructor(private route: ActivatedRoute,public profileService: ProfileService) { }

  ngOnInit() {
      this.profileService.getUserById(this.id).then((result: User) => {
        this.list= result.followedUsers;
        console.log("list id is now "+this.list);
      });      
  }
getNameof(id: number): string{
  let username = "";
  this.profileService.getUserById(id).then((result: User) => {
    console.log(result.name);
    username =  result.name;})
    return username;
  }

}
