import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from 'src/app/service/profile.service';
import { Notification } from "src/app/models/Notifications";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  @Input() username = "";
  message: string; 
  notifications: Notification[];

  constructor(private route: ActivatedRoute, public profileService: ProfileService, private router:Router) { }

  ngOnInit(): void {
    this.message = 'OnInit Executed:- '+this.message;
  }

  ngOnChanges(changes: SimpleChanges): void{
    
  }
}
