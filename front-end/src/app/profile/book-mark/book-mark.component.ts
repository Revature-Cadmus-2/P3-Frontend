import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { Root } from 'src/app/models/root';
import { FollowingPost } from 'src/app/models/FollowingPost';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-book-mark',
  templateUrl: './book-mark.component.html',
  styleUrls: ['./book-mark.component.css']
})
export class BookMarkComponent implements OnInit {
 //notes to future devs the bookmark is the same thing as the notification and piggy backs off the 
 //same code we originally intended to have bookmark and follow seperate but then merged them into one 
  
 constructor(private route: ActivatedRoute, public profileService: ProfileService) { }
  @Input() id = 0;
  message: string;
  user!: User;
  roots!: Root[];
  comments!: Comment[];
  activity: any[] = [];
  BookedList: FollowingPost[];

  ngOnInit(): void {
    this.BookedList = [];
    this.profileService.getFollowedPostByUserId(this.id).then((result: [FollowingPost]) => {
      this.BookedList= result;
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.message = 'ngOnChanges Executed'
    this.BookedList = [];
    this.profileService.getFollowedPostByUserId(this.id).then((result: [FollowingPost]) => {
      this.BookedList= result;
    });
  }
}