import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createNewGroups(): void {
    console.log("Requesting to create new group.")
    this.router.navigateByUrl('create-group');
  }
}