import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Chat} from "../../models/chat.model";
import {Store} from "@ngrx/store";
import * as OtherActions from "../../state/other/other.actions"
import * as otherSelectors from "../../state/other/other.selector"
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import * as AuthSelectors from "../../state/auth/auth.selector";
import {Observable} from "rxjs";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {


  chats$!: Observable<Chat[]>
  chatForm!: FormGroup;
  authUser$!: Observable<User | null>;

  constructor(private userService: UserService, private store: Store<any>,
              private route: ActivatedRoute, private router: Router,
              private chatService: ChatService) {
    this.authUser$ = this.store.select(AuthSelectors.selectAuthUser)
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('user_id')
      if (id) {
        this.userService.getUserChats(id).subscribe(res => this.store.dispatch(OtherActions.loadChatsSuccess({chats: res})));
        this.chats$ = this.store.select(otherSelectors.selectChats)
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
      const data = {to: this.route.snapshot.params.user_id, message: this.chatForm.value.message}
      this.chatService.sendMessage(data)
      this.chatService.getMessages().subscribe(data => {
        this.store.dispatch(OtherActions.createChat({chat: data}))

        this.scrollDown()
      })
    }
    this.chatForm.reset()

  }

  scrollDown() {
    const chat = document.getElementById('messages-content');
    if (chat) {
      console.log(chat.scrollTop, chat.scrollHeight)
      chat.scrollTop = chat.scrollHeight;
      chat.scroll(0, chat.scrollHeight)
      console.log(chat.scrollTop, chat.scrollHeight)
    }
  }

}

// у меня есть чат проэкт в ангулар как сделать скролл вниз если написал новый сообщение  html:<div class="chat-bottom dark-bg p-3 shadow-none theme-dark-bg" style="width: 98%;">
//         <form [formGroup]="chatForm" (ngSubmit)="sendMessage()" class="chat-form">
//           <button class="bg-grey float-left"><i class="bi bi-image"></i></button>
//           <div class="form-group">
//             <input formControlName="message" class="form-control" name="message" style="color: black" type="text"
//                    placeholder="Start typing..">
//           </div>
//           <button class="bg-current"><i class="bi bi-arrow-right-circle"></i></button>
//         </form>
//       </div>
// comp:export class ChatComponent implements OnInit {
//   chats$!: Observable<Chat[]>
//   chatForm!: FormGroup;
//   authUser$!: Observable<User | null>;
//
//   constructor(private userService: UserService, private store: Store<any>,
//               private route: ActivatedRoute, private router: Router,
//               private chatService: ChatService) {
//     this.authUser$ = this.store.select(AuthSelectors.selectAuthUser)  }
//
//   ngOnInit() {  }
//
//   sendMessage() {  }
