import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {Observable} from "rxjs";
import {Chat} from "../models/chat.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private socket:Socket;
  private socket = io('http://localhost:8787');
  private url = 'http://localhost:8787/api/'



  constructor(
    private http: HttpClient
  ) {
    // this.socket = new Socket({url:this.url})
  }

  joinRoom(data: any) {
    this.socket.emit('join', data)
  }

  sendMessage(data: { to: string, message: string, photo: File | null }) {
    const formData = new FormData();
    formData.append('message', data.message);
    if (data.photo) {
      formData.append('photo', data.photo);
    }
    formData.append('to', data.to);
    // this.http.post(this.url + 'chat', formData).subscribe(res => {
    //   console.log(res)
    // })
    this.http.post<Chat>(this.url + 'chat/' + data.to, formData,
      {withCredentials: true,reportProgress: true, responseType: 'json'}).subscribe(
      res => {
        console.log(res)
        this.socket.emit('message', res)
      })
  }

  getMessages() {
    return new Observable<Chat>(observer => {
      this.socket.on('loadNewChat', (data) => {

        observer.next(data);
      });
      return () => {

        this.socket.disconnect();
      };
    });
  }
}

