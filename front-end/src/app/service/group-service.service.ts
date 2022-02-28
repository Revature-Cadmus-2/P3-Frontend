import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/Group';
import { GroupMembers } from '../models/GroupMembers';
import { Root } from '../models/root';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  private groupUrl: string = "http://apollouser-prod.us-east-2.elasticbeanstalk.com/api/Group";
  private groupMembersUrl: string = "http://apollouser-prod.us-east-2.elasticbeanstalk.com/api/GroupMembers";

  constructor(private http: HttpClient) { }

  getAllGroups(): Promise<Group[]> {
    return this.http.get<Group[]>(this.groupUrl).toPromise();
  }

  createGroup(group : Group): Promise<Group>{
    return this.http.post<Group>(this.groupUrl, group).toPromise();
  }

  goToGroup(id: number): Promise<Group>{
    return this.http.get<Group>(this.groupUrl + '/' + id).toPromise();
  }

  
  // getAllGroupsByUserId(userId : any): Promise<Group[]>{
  //   return this.http.get<Group[]>(this.)
  // }
}