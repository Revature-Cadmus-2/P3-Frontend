import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Root } from '../models/root';
import { AuthService } from '@auth0/auth0-angular';
import { RootServiceService } from '../service/root-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

import { NgToastService } from 'ng-angular-popup';
import { NgToastModule } from 'ng-angular-popup';
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
    dateTime: new Date(0), //may have to remove '0' from new Date
    userName: '',
    comments: [],
    groupPostId: 0
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
        //alert("Post successfully created")
        //this.toast.success({detail:'Success Message',summary:'Post successfully created',duration:10000});
        this.router.navigateByUrl('root');
      })

    })

  }

}
