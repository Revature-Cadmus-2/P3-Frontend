import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Root } from '../models/root';
import { AuthService } from '@auth0/auth0-angular';
import { RootServiceService } from '../service/root-service.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(groupForm: NgForm) {

  }

}
