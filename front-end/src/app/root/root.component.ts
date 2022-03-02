import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Root } from '../models/root';
import { RootServiceService } from '../service/root-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { Vote } from '../models/vote';
import { ProfileService } from '../service/profile.service';
import { User } from '../models/user';
import { ThemeService } from '../ThemeService';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})

export class RootComponent implements OnInit {

  constructor(private router: Router, private rootService: RootServiceService, public auth: AuthService, public profileService: ProfileService, private themeService: ThemeService) { }
  isDarkMode: boolean;
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
  counter: number = 0;
  random: Root[] = [];
  featured: Root = {
    id:0,
    title: '',
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    comments: [],
    groupPostId: 0
  }
  currentUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: []
  }; 

  ngOnInit(): void {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    //this.rootService.getAllRoots().then(result => {
      
    this.rootService.getRootByGroupId(0).then(result => {
      result.sort((a, b) => (a.dateTime < b.dateTime) ? 1 : -1);
      this.roots = result;
      for(let root of this.roots){
        console.log(root.groupPostId + ", " + root.title);
        
          root.totalVote = 0
          this.rootVoteCounter = 0
          for (let comment of root.comments) {
            comment.totalVote = 0;
            this.voteCounter = 0;
            for (let vote of comment.votes) {
              this.voteCounter = this.voteCounter + vote.value;
            }
            comment.totalVote = this.voteCounter;
            this.rootVoteCounter = this.rootVoteCounter + comment.totalVote
          }
          root.totalVote = this.rootVoteCounter

      }
      this.isLoaded = true;
    })
// popular featured post
    
    this.rootService.getAllRoots().then(result => {
      var randomNumber = Math.floor(Math.random() * result.length);
      this.random = result;
      this.featured = this.random[randomNumber];
      this.auth.user$.subscribe((user) => {
        if (user?.preferred_username) {
          this.profileService.getUserByName(user.preferred_username).then((result: User) => {
            this.currentUser= result;
          });
        }
      })
    })
}

  goToCreatePost(): void {
    this.router.navigateByUrl('create-post');
  }

  goToUserProfile(username:string):void {
    this.profileService.getUserByName(username).then((result: User) => {
      let userId= result.id;
      this.router.navigateByUrl('profile/'+userId);
    });
  }

  sortPopular(): void {
    this.isLoaded = false;
    this.rootService.getAllRoots().then(result => {
      result.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1);
      this.roots = result;
      this.isLoaded = true;

    })
  }

  sortNewest(): void {
    this.isLoaded = false;
    this.rootService.getAllRoots().then(result => {
      result.sort((a, b) => (a.dateTime < b.dateTime) ? 1 : -1);
      this.roots = result;
      this.isLoaded = true;

    })
  }

  sortOldest(): void {
    this.isLoaded = false;
    this.rootService.getAllRoots().then(result => {
      result.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
      this.roots = result;
      this.isLoaded = true;
    })
  }
  
  sortGroupPosts(): void {
    console.log("You clicked me");
    }
  }

// }
