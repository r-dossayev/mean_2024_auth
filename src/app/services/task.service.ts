import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import { ajax } from 'rxjs/ajax';
import { Task } from '../models/task.model';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {gql} from "@apollo/client/core";
import * as AuthActions from "../state/auth/auth.actions";
import {Apollo} from "apollo-angular";
import {Chat} from "../models/chat.model";
import {io} from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public socket = io('http://localhost:8787');
  constructor( private http: HttpClient , private apollo: Apollo
  ) { }
  url = "http://localhost:8787/api/";

  getTasks(): Observable<any> {
    console.log("getTasks")
    return this.http.get(this.url + 'task', {withCredentials: true});
  }

  getTasks2(): Observable<any> {
   return  this.apollo.watchQuery<any>({
      query: gql`
        query {
          getTasks {
            _id,
            description,
            title,
            status,
            created_at
          }
        }
      `,
    }).valueChanges;

  }

  addTask(task: any): Observable<Task> {
    return this.http.post<Task>(this.url + 'task', task, {withCredentials: true});
  }

  getTask(id:number): Observable<any[]> {

    return new Observable<any[]>(observer => {
      fetch(this.url +"task/"+id).then(response => {
        response.json().then(data => {
          observer.next(data);
          observer.complete();
        });
      });
    });

  }




  updateTask(task:any){
    return this.http.put<Task>(this.url + "task/"+task._id, task, {withCredentials: true});
    // let ajax$ =  ajax({
    //   url: this.url + "task/"+task._id,
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(task),
    // })
    //
    // return new Observable<Task>(observer => {
    //   ajax$.subscribe((response:any) => {
    //     observer.next(response.response.data);
    //     observer.complete();
    //   });
    // });
  }

  deleteTask(id:string) {

    console.log(id, "id")
    return this.http.delete(this.url + "task/"+id, {withCredentials: true});
  }
  newTask(data: { title: string; description: string; status: string }) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('status', data.status);
    // this.http.post(this.url + 'chat', formData).subscribe(res => {
    //   console.log(res)
    // })
    this.http.post<Task>(this.url + 'task' , formData,
      {withCredentials: true,reportProgress: true, responseType: 'json'}).subscribe(
      res => {
        console.log(res)
        this.socket.emit('new_task', res)
      })
  }

  getNewTask() {
    return new Observable<any>(observer => {
      this.socket.on('loadNewTask', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }


}
