import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Root } from '../models/root';
import { AuthService } from '@auth0/auth0-angular';
import { RootServiceService } from '../service/root-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private rService: RootServiceService, private toastr: ToastrService) { }

  root: Root = {
    id: 0,
    title: '',
    message: '',
    totalVote: 0,
    dateTime: new Date(0),
    userName: '',
    comments: []
  }

  ngOnInit(): void { //Intentionally blank
  }

  onSubmit(postForm: NgForm) {
    this.auth.user$.subscribe((user) => {
      if (user?.preferred_username) {
        this.root.userName = user.preferred_username
      }

      this.root.dateTime = new Date()
      this.rService.addRoot(this.root).then(res => {
       // alert("Post successfully created")
       this.toastr.success( 'You Successfully Created a Post','Post Notification', {
        timeOut: 2000,
      } ); //Notification for displaying Successfully Posted. GM
        this.router.navigateByUrl('root');
      })

    })

  }

}
