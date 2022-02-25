import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowedBy } from 'src/app/models/FollowedBy';
import { ProfileService } from 'src/app/service/profile.service';
import { User } from '@auth0/auth0-spa-js';

//people following you, cynthias new code

@Component({
  selector: 'app-users-follower-list',
  templateUrl: './users-follower-list.component.html',
  styleUrls: ['./users-follower-list.component.css']
})
export class UsersFollowerListComponent implements OnInit {
  @Input() id = 0;
  message: string;
  followersList!: FollowedBy[];

  constructor(private route: ActivatedRoute, public profileService: ProfileService) { }

  ngOnInit(): void {
    this.message = 'OnInit Executed:- '+this.message;
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.message = 'ngOnChanges Executed'
    this.followersList=[];
    this.profileService.getFollowersByUserId(this.id).then((result: [FollowedBy]) => {
    this.followersList= result;
    });
  }

}
