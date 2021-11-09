import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Root } from '../models/root';
import { formatDate } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { RootServiceService } from '../service/root-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private rService: RootServiceService) { }

  root: Root = {
    id: 0,
    title: '',
    message: '',
    totalVote: 1,
    dateTime: new Date(0),
    userName: '',
    comments: []
  }

  ngOnInit(): void {
  }

  onSubmit(postForm: NgForm) {
    this.auth.user$.subscribe((user) =>{
      if(user?.preferred_username){
        this.root.userName = user.preferred_username
      }

      this.root.dateTime = new Date()
      console.log(this.root)

      this.rService.addRoot(this.root).then(res => {
        alert("Post successfully created")
        this.router.navigateByUrl('root');
      })

      //console.log(formatDate(this.root.dateTime, "yyyy-MM-ddTHH:mm:ss", "en-US"))
      
    })
    
  }

}
