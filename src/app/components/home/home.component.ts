import { Component } from '@angular/core';
import {Observable} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
posts$!: Observable<any>;

  constructor() {

  }

  ngOnInit(): void {
  }

  addPost(){
    console.log('Add Post')
  }

  deletePost(){
    console.log('Delete Post')
  }

  updatePost(){
    console.log('Update Post')
  }

  getPosts(){
    console.log('Get Posts')
  }
}
