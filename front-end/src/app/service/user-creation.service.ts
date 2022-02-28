import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserCreationService {
  userName?: string;



  constructor(private http: HttpClient) { }

  apiUrl = "https://54.87.122.77/user/api";


  getAllUsers(): Promise<User[]>
  {
    return this.http.get<[]>(this.apiUrl + "/User/").toPromise();
  }

  getUserByName(username: string): Promise<User> {
    return this.http.get<User>(this.apiUrl + "/User/username/" + username).toPromise();
  }

  AddObject(user: User): Promise<User>
  {
    return this.http.post<User>(this.apiUrl + "/User", user).toPromise();
  }
  
}
