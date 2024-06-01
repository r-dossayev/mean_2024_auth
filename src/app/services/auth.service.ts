import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8787/api/';

  constructor(
    private http: HttpClient,

  ) {
  }


  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post(this.url + 'login', data, {withCredentials: true});
  }

  register(user: User): Observable<any> {
    return this.http.post(this.url + 'register', user, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.post(this.url + 'logout', {withCredentials: true});
  }

  getUser(): Observable<{ status: boolean; data: User }> {
    return this.http.get<{status: boolean, data: User}>(this.url + 'auth_user', {withCredentials: true});

  }





}


