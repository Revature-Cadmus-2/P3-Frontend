import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { Root } from 'src/app/models/root';
import { FollowingPost } from 'src/app/models/FollowingPost';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';
import { MatCard } from "@angular/material/card";

//old code

@Component({
  selector: 'app-followed-posts',
  templateUrl: './followed-posts.component.html',
  styleUrls: ['./followed-posts.component.css']
})
export class FollowedPostsComponent implements OnInit {
  @Input() id = 0;
  message: string;
  user!: User;
  roots!: Root[];
  comments!: Comment[];
  activity: any[] = [];
  followedList: FollowingPost[];


  constructor(private route: ActivatedRoute, public profileService: ProfileService) { }

  ngOnInit(): void {
    this.followedList = [];
    this.profileService.getFollowedPostByUserId(this.id).then((result: [FollowingPost]) => {
      this.followedList= result;
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.message = 'ngOnChanges Executed'
    this.followedList = [];
    this.profileService.getFollowedPostByUserId(this.id).then((result: [FollowingPost]) => {
      this.followedList= result;
    });
  }

}
