import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { AmazonS3Service } from 'src/app/service/amazon-s3.service';
import { AuthService} from '@auth0/auth0-angular';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/service/profile.service';
import { userInfo } from 'os';


@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']

})
export class SettingPageComponent implements OnInit {

  currentUser: User = {
    id: 0,
    username:"",
    email: "",
    name: "",
    followings: []
  };

  constructor(private profileService: ProfileService, public auth: AuthService, private router: Router, private http: HttpClient,public amazons3: AmazonS3Service) { }
  selectedFile = null;
  
  ngOnInit(): void {
    this.auth.user$.subscribe(
      (user) => (this.currentUser.username = user.preferred_username)
      )
      console.log(this.currentUser);
  }
  onFileSelected(event){
    
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(){
    
    let imgurl =this.amazons3.uploadFileToS3Bucket(this.selectedFile);
    console.log(imgurl);
    console.log(this.currentUser);
  }
  

}
