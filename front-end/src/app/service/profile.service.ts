import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Root } from '../models/root';
import { Comment } from '../models/Comment';
import { FollowingPost } from '../models/FollowingPost';
import { Observable } from 'rxjs';
import { Followings } from '../models/Followings';
import { RecentActivity } from '../models/RecentActivity';
import { FollowedBy } from '../models/FollowedBy';
import { Post } from "../models/post";
import { Notification } from "../models/Notifications";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl = 'https://54.87.122.77/user/api/User';
  rootUrl = 'https://54.87.122.77/post/api/Post';
  followUrl = 'https://54.87.122.77/user/api/Following';
  followingPostUrl = 'https://54.87.122.77/user/api/FollowingPost'
  followedByUrl = 'https://54.87.122.77/user/api/FollowedBy';
  notificationUrl = 'https://54.87.122.77/user/api/Notifications';

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

    // this.http.get<[]>(this.rootUrl).toPromise().then((result: Comment[]) => {
    //   for(let i = 0; i<result.length; i++){
    //     if (result[i].userName==username){
    //       let activityToAdd: RecentActivity= {
    //         id: 0,
    //         date: null,
    //         type: "",
    //         title:""
    //       }
    //       activityToAdd.date=result[i].dateTime;
    //       activityToAdd.id=result[i].id;
    //       activityToAdd.type="nest";
    //       activityToAdd.title=result[i].message; 
    //       activityList.push(activityToAdd);
    //       }
    //     };
    // });
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

  getFollowersByUserId(id: number): Promise<FollowedBy[]>
  {
    return this.http.get<[]>(this.followedByUrl + "/userId/" + id).toPromise();
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

  unfollowPost(id: number): Promise<FollowingPost>
  {
    return this.http.delete<FollowingPost>(this.followingPostUrl + "/id/" + id).toPromise();
  }

  followUser(follow: Followings): Observable<Followings> {
    return this.http.post<Followings>(this.followUrl, follow);
  }

  unfollowUser(followId: number): Observable<Followings> {
    return this.http.delete<Followings>(this.followUrl + "/id/"+ followId);
  }

  userFollowers(follower: FollowedBy): Promise<FollowedBy> {
    return this.http.post<FollowedBy>(this.followedByUrl, follower).toPromise();
  }

  userUnFollower(id: number): Promise<FollowedBy> {
    return this.http.delete<FollowedBy>(this.followedByUrl+ "/" + id).toPromise();
  }

  AddUserProfilePicture(sessionUserName: string, imgurl: string) :Promise <any>{
    console.log("Uploading imgurl "+ imgurl + " to user "+ sessionUserName+"'s profile" );
    let username = sessionUserName;
    var payload = { params: {
              "username":username,
              "imgurl":imgurl
              }
            }
    return this.http.put<any>(`${this.apiUrl}/UpdatePicture`, {}, payload).toPromise();
  }


  addNotification(notifications: Notification): Promise<Notification> {
    return this.http.post<Notification>(this.notificationUrl, notifications).toPromise();
  }

  getNotificationByUser(id: number): Promise<Notification[]> {
    return this.http.get<Notification[]>(this.notificationUrl+ "/userId/" +id).toPromise();
  }

  
  getNotifications(username: string): Notification[]{
    var notificationList = new Array();
    this.http.get<[]>(this.notificationUrl).toPromise().then((result: Post[]) => {
      for(let i = 0; i < result.length; i++){
        if(result[i].userName == username){
          let notificationToAdd: Notification = {
            id: 0,
            userId: 0,
            FollowersId: 0,
            postId: 0,
            commentId: 0,
          }
          notificationToAdd.postId = result[i].id;
          notificationList.push(notificationToAdd);
        }
      }
    });
    this.http.get<[]>(this.notificationUrl).toPromise().then((result: Comment[]) =>{
      for(let i = 0; i < result.length; i++){
        if(result[i].userName == username){
          let notificationToAdd = {
            id: 0,
            userId: 0,
            FollowersId: 0,
            postId: 0,
            commentId: 0,
          }
          notificationToAdd.commentId = result[i].id;
          notificationList.push(notificationToAdd);
        }
      }
    });
    return(notificationList);
  }
  removeNotification(id: number): Promise<Notification>{
    return this.http.delete<Notification>(this.notificationUrl + "/id/" + id).toPromise();
  }
  getNotificationByUserID(id: number): Promise<Notification[]>{
    return this.http.get<[]>(this.notificationUrl + "/userId/" + id).toPromise();
  }
  getNotificationByID(id: number): Promise<Notification>{
    return this.http.get<Notification>(this.notificationUrl + "/id/" + id).toPromise();
  }
}
