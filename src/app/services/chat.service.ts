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

  sendMessage(data: { to: string, message: string, photo: string | null }) {
    this.http.post<Chat>(this.url + 'chat/' + data.to, data, {withCredentials: true}).subscribe(
      res => {
        this.socket.emit('message', res)
      })
    // this.socket.emit('message',data)
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

