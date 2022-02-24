import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/Group';
import { GroupMembers } from '../models/GroupMembers';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  private groupUrl: string = "http://apollouser-prod.us-east-2.elasticbeanstalk.com/api/Group";
  private groupMembersUrl: string = "http://apollouser-prod.us-east-2.elasticbeanstalk.com/api/GroupMembers";

  constructor(private http: HttpClient) { }

  createGroup(group : Group): Promise<Group>{
    return this.http.post<Group>(this.groupUrl, group).toPromise();
  }
}
