import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  getPosts():Observable<Post[]> {
    const data = [
      {id: '2', title: 'Postaa 2', content: 'This is post 2', image: 'https://via.placeholder.com/150'},
      {id: '3', title: 'Post 3', content: 'This is post 3', image: 'https://via.placeholder.com/150'},
      {id: '4', title: 'Post 4', content: 'This is post 4', image: 'https://via.placeholder.com/150'},
    ]
    return new Observable<Post[]>(subscriber => {
      subscriber.next(data);
    })


  }
}
