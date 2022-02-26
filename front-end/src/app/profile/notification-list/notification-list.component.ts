import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from 'src/app/service/profile.service';
import { Notification } from "src/app/models/Notifications";
import { RootServiceService } from 'src/app/service/root-service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  @Input() username = "";
  @Input() id = 0;
  message: string; 
  notificationsList: Notification[];

  constructor(private route: ActivatedRoute, public profileService: ProfileService, private router:Router, public rootService: RootServiceService) { }

  ngOnInit(): void {
    this.message = 'OnInit Executed:- '+this.message;
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.notificationsList = [];
    this.profileService.getNotificationByUser(this.id).then((result: [Notification]) => {
      this.notificationsList = result;
    })
  }

  
}
