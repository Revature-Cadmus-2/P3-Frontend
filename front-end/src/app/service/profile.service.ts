import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Root } from '../models/root';
import { Comment } from '../models/Comment';
import { FollowingPost } from '../models/FollowingPost';
import { Observable } from 'rxjs';
import { Followings } from '../models/Followings';
import { RecentActivity } from '../models/RecentActivity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl = 'https://54.87.122.77/user/api/User';
  rootUrl = 'https://54.87.122.77/post/api/Post';
  followUrl = 'https://54.87.122.77/user/api/Following';
  followingPostUrl = 'https://54.87.122.77/user/api/FollowingPost'

  constructor(private http: HttpClient) { }


  // getAll(): Observable<any> {
  //   return this.http.get(this.apiUrl + '_sort=id&order=desc')
  //   .pipe();
  // }

  getUserById(id: number): Promise<User>
  {
    return this.http.get<User>(this.apiUrl + "/id/" + id).toPromise();
  }
  
  getUserByName(username: string): Promise<User> {
    return this.http.get<User>(this.apiUrl + "/username/" + username).toPromise();
  }

  getAllUsers(): Promise<User[]>
  {
    return this.http.get<[]>(this.apiUrl).toPromise();
  }

  getAllPosts(): Promise<Root[]>
  {
    return this.http.get<Root[]>(this.rootUrl).toPromise();
  }

  getAllComments(): Promise<Comment[]>
  {
    return this.http.get<[]>(this.rootUrl).toPromise();
  }

  getFollowedPostByUserId(id: number): Promise<FollowingPost[]>
  {
    return this.http.get<[]>(this.followingPostUrl + "/userid/"+ id).toPromise();
  }

  //we can use updateUser to follow/unfollow both posts and other users, since both following models are contained within the user
  updateUser(updatedUser: User): Promise<User> {
    return this.http.post<User>(this.apiUrl, updatedUser).toPromise();
  }

  getRecentActivity(username: string): RecentActivity[]
  {
    var activityList= new Array();

    this.http.get<[]>(this.rootUrl).toPromise().then((result: Comment[]) => {
      for(let i = 0; i<result.length; i++){
        if (result[i].userName==username){
          let activityToAdd: RecentActivity= {
            id: 0,
            date: null,
            type: "",
            title:""
          }
          activityToAdd.date=result[i].dateTime;
          activityToAdd.id=result[i].id;
          activityToAdd.type="nest";
          activityToAdd.title=result[i].message; 
          activityList.push(activityToAdd);
          }
        };
    });
    this.http.get<[]>(this.rootUrl).toPromise().then((result: Root[]) => {
      for(let i = 0; i<result.length; i++){
        if (result[i].userName==username){
          let activityToAdd: RecentActivity= {
            id: 0,
            date: null,
            type: "",
            title:""
          }
          activityToAdd.date=result[i].dateTime;
          activityToAdd.id=result[i].id;
          activityToAdd.type="comment";
          activityToAdd.title=result[i].title;
          activityList.push(activityToAdd);
          }
        };
    });
    return(activityList);
  }

  async getFollowingsByUserId(id: number): Promise<Followings[]>
  {
    return this.http.get<[]>(this.followUrl + "/followeruserId/"+ id).toPromise();
  }

  checkFollowingPost(followedPostId: number, currentUser:number): boolean{

    var doesFollow = false;
    this.getFollowedPostByUserId(currentUser).then((result: FollowingPost[]) => {
      let listOfFollowings = result;
      for(let i = 0; i < listOfFollowings.length; i++){
        if (listOfFollowings[i].rootId == followedPostId){
          doesFollow = true;
        }
      }
    })
    return doesFollow;
}

  followPost(followedPost: FollowingPost): Promise<FollowingPost> {
    return this.http.post<FollowingPost>(this.followingPostUrl, followedPost).toPromise();
  }

  unfollowPost(id: number) {
    return this.http.delete<FollowingPost>(this.apiUrl+"/id/"+id).toPromise();
  }

  followUser(follow: Followings): Observable<Followings> {
    return this.http.post<Followings>(this.followUrl, follow);
  }

  unfollowUser(followId: number): Observable<Followings> {
    return this.http.delete<Followings>(this.followUrl + "/id/"+ followId);
  }

}
