import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { S3Service } from 'src/app/service/s3.service';
import { AuthService} from '@auth0/auth0-angular';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';
import { userInfo } from 'os';
import { UserCreationService } from 'src/app/service/user-creation.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  constructor(private userService: UserCreationService, private profileService: ProfileService, public auth: AuthService, private router: Router, private http: HttpClient,public amazons3: S3Service) { }
  selectedFile = null;
  
  ngOnInit(): void {
    this.auth.user$.subscribe((userInfo)=> { 
      if (userInfo?.preferred_username==null) {
        console.log("nothing to show")
      } else {
        console.log(userInfo?.preferred_username);
        console.log(userInfo);

      }
    })
  }
  onFileSelected(event){
    
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(){
<<<<<<< HEAD
    
    var imgurl =this.amazons3.uploadFileToS3Bucket(this.selectedFile);
=======
    console.log("on upload called in setting page")
    let imgurl =this.amazons3.uploadFileToS3Bucket(this.selectedFile);
>>>>>>> 291868da2c149f88cb3b3ff3fc82ee0f17488922
    console.log(imgurl);
    this.auth.user$.subscribe((userInfo)=> { 
      if (userInfo?.preferred_username==null) {
        console.log("nothing to show")
      } else {
        console.log(userInfo?.preferred_username);
        console.log(userInfo);
        if(typeof(imgurl)=='string'|| imgurl instanceof String) {
        this.amazons3.AddUserProfilePicture(userInfo?.preferred_username, imgurl)
<<<<<<< HEAD
=======
        
>>>>>>> 291868da2c149f88cb3b3ff3fc82ee0f17488922
        } else {
          console.log("not a string");
        }
      }
    })
  }
}