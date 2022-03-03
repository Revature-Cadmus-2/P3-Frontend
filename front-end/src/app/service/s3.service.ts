import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  
  // this is the service for the s3 bucket below replace the secret key and to keep google from tracking 
  // you down and publishing the key create a Key.txt filein the assets folder and put the key value in there (no spaces)
  constructor(private http: HttpClient) { }
  accessKeyID = "AKIATC6YQL2BHJSIC3OM"
  
  secretAccessKey = ""
  key = this.http.get("assets/Key.txt" , { responseType: 'text' }).subscribe(data => {
    this.secretAccessKey = data;
  })
  
  
  async uploadFileToS3Bucket(file: any){
    const contentType = file.type;
    const bucket = new S3(
      {
          // if change below info to match your s3 bucket future coder :)
          accessKeyId: this.accessKeyID,
          secretAccessKey:`${this.secretAccessKey}`,
          region: 'us-east-2'  
      });
    const params = {
      // Change bucket name too. Or don't who am I to tell you what to do 
      Bucket: 'apollobucket33',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    }
    //Uploads image to Amazon S3 bucket
    var bucketLink = await bucket.upload(params).promise()
    return bucketLink;
  }
}
