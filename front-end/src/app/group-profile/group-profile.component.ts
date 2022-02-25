import { Component, OnInit } from '@angular/core';
import { GroupServiceService } from '../service/group-service.service';
import { Group } from '../models/Group';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
