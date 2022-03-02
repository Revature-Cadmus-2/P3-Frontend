import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { S3Service } from 'src/app/service/s3.service';
import { AuthService} from '@auth0/auth0-angular';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';
import { userInfo } from 'os';
import { UserCreationService } from 'src/app/service/user-creation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  constructor(private userService: UserCreationService, private profileService: ProfileService, public auth: AuthService, private router: Router, private http: HttpClient,public amazons3: S3Service, private toastr: ToastrService) { }
  selectedFile = null;
  
  ngOnInit(): void {
    
  }
  onFileSelected(event){
    
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  BioUpload(){
    document.getElementById('biotext')
    
  }
    
  onUpload(){
    const sessionUserName = sessionStorage.getItem('username');
    console.log(sessionUserName+'this is my sessions storage preferred username in *****');
    console.log("on upload called in setting page")
    this.amazons3.uploadFileToS3Bucket(this.selectedFile).then((response: any) => {
      var imglink = JSON.stringify(response.Location).slice(1,-1)
      this.profileService.AddUserProfilePicture(sessionUserName, imglink)
      console.log(imglink);
      this.toastr.success( 'You Successfully added a Picture','Settings Notification', {
        timeOut: 2000,
      } ); //Notification for displaying when you add a profile pic
  }
  )}
  
}


