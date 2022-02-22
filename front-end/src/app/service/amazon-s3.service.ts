import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';


@Injectable({
  providedIn: 'root'
})
export class AmazonS3Service {

  constructor( private http: HttpClient) { }
  accessKeyID = "AKIATC6YQL2BJ2ENSAVL"
  //secretAccessKey = "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"
  secretAccessKey = ""
  key = this.http.get("assets/Key.txt" , { responseType: 'text' }).subscribe(data => {
    this.secretAccessKey = data;
  })
  
  
  async uploadFileToS3Bucket(file: any){

    const contentType = file.type;
    const bucket = new S3(
      {
          accessKeyId: this.accessKeyID,
          secretAccessKey:`${this.secretAccessKey}`,
          region: 'us-east-2'  
      });
    const params = {
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


