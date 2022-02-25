import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Root } from '../models/root';
import { Comment } from '../models/Comment';
import { RootServiceService } from '../service/root-service.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-read-root',
  templateUrl: './read-root.component.html',
  styleUrls: ['./read-root.component.css']
})
export class ReadRootComponent implements OnInit {

  constructor(public router: Router, private currentRoute: ActivatedRoute, private rootService: RootServiceService, public auth: AuthService) { }

  id = 0;
  user: string = '';
  roots: Root[] = [];
  topStory: Comment[];

  comment: Comment = {
    id: 0,
    parentId: 0,
    rootId: 0,
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    votes: [],
    comments: []
  }

  popular: Comment = {
    id: 0,
    parentId: 0,
    rootId: 0,
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    votes: [],
    comments: []
  }

  root: Root = {
    id: 0,
    title: '',
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    comments: []
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user?.preferred_username) {
        this.user = user.preferred_username
      }
    })

    this.currentRoute.params.subscribe(params => {
      this.id = params['id'];

      this.rootService.getRootById(this.id).then((result: Root) => {
        this.root = result;
        result.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1);
        if (this.popular.comments != null) {
          this.popular = result.comments[0];
          this.topStory= [this.popular];
          this.topStory = this.topStory.concat(this.rootService.RecursiveFunction(this.popular));
        }
      })
    })
  }
}
