import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Chat} from "../models/chat.model";
import {gql} from "@apollo/client/core";
import {Apollo} from "apollo-angular";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8787/api/';

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) {
  }


  getUserById(id:string):Observable<User>{
    return this.http.get<User>(this.url + 'user/'+id, {withCredentials: true});
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'user/list', {withCredentials: true});
  }

  getUserChats(id:string):Observable<Chat[]>{
    return this.http.get<Chat[]>(this.url + 'chat/'+id, {withCredentials: true});
  }

  sendMessage(data: {to:string, message:string}):Observable<Chat>{
    return this.http.post<Chat>(this.url + 'chat/'+data.to, data, {withCredentials: true});
  }
  getUsersGraph(): Observable<any> {
    return this.apollo
    .watchQuery<any>({
      query: gql`
        query {
          getUsers {
            _id,
            email,
            firstName,
            lastName
          }
        }
      `,
    })
    .valueChanges;
  }

}
