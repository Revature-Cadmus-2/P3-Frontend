import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Followings } from 'src/app/models/Followings';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-list-of-followers',
  templateUrl: './list-of-followers.component.html',
  styleUrls: ['./list-of-followers.component.css']
})
export class ListOfFollowersComponent implements OnInit {
  @Input() id = 0;
  message: string;
  followedList!: Followings[];


  constructor(private route: ActivatedRoute,public profileService: ProfileService) { }

  ngOnInit() {
    this.message = 'OnInit Executed:- '+this.message;
  }

  ngOnChanges(changes: SimpleChanges): void{
      this.message = 'ngOnChanges Executed'
      this.followedList=[];
      this.profileService.getUserById(this.id).then((result: User) => {
        this.followedList= result.followings;
      });
  }
}
