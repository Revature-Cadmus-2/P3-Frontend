import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserCreationService {
  userName?: string;



  constructor(private http: HttpClient) { }

  apiUrl = 'https://52.141.211.229/user/api';


  getAllUsers(): Promise<User[]>
  {
    return this.http.get<[]>(this.apiUrl + "/user/").toPromise();
  }

  getUserByName(username: string): Promise<User> {
    return this.http.get<User>(this.apiUrl + "/user/username/" + username).toPromise();
  }

  AddObject(user: User): Promise<User>
  {
    return this.http.post<User>(this.apiUrl + "/user/", user).toPromise();
  }
  
}
