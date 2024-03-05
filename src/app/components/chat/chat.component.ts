import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Chat} from "../../models/chat.model";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {


  chats!: Chat[]
  chatForm!: FormGroup;

  constructor(private userService: UserService, private store: Store<any>, private route: ActivatedRoute, private router: Router) {

    // this.userService.getUserChats().subscribe(data => {
    //   this.store.dispatch(AuthActions.loginSuccess({user: data.data}))
    // })
    // this.isAuth$ = this.store.select(AuthSelectors.selectIsAuthenticated)
    // this.authUser$ = this.store.select(AuthSelectors.selectAuthUser)
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('user_id')
      if (id) {
        this.userService.getUserChats(id).subscribe(data => this.chats = data)
      } else {
        this.router.navigate(['/'])
      }
    })
    this.chatForm = new FormGroup({
      message: new FormControl<string>('', [Validators.required]),
    })

  }

  sendMessage() {
    if (!this.chatForm.invalid) {
      console.log(this.chatForm.value)
      const data ={to: this.route.snapshot.params.user_id, message: this.chatForm.value.message}
      this.userService.sendMessage(data)
        .subscribe(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
    }

  }

  getMessages() {
    // get messages
  }


}
