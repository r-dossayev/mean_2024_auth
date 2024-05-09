import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private userService: UserService, private store: Store<any>,
              private route: ActivatedRoute, private router: Router,
              private chatService: ChatService) {
    this.authUser$ = this.store.select(AuthSelectors.selectAuthUser)
    this.chatService.getMessages().subscribe(data => {
      this.store.dispatch(OtherActions.createChat({chat: data}))
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('user_id')
      if (id) {
        this.userService.getUserChats(id).subscribe(res => this.store.dispatch(OtherActions.loadChatsSuccess({chats: res})));
        this.chats$ = this.store.select(otherSelectors.selectChats)
        this.store.select(otherSelectors.selectChats).subscribe(data => {
          console.log(data)
        })
      } else {
        this.router.navigate(['/'])
      }
    })
    this.chatForm = new FormGroup({
      message: new FormControl<string>(' .', [Validators.required]),
      photo: new FormControl<File|null>(null)
    })

    this.scrollToBottom(0);

  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.chatForm.patchValue({ photo: file});
  }
  sendMessage() {
    if (!this.chatForm.invalid) {

      const data = {to: this.route.snapshot.params.user_id, message: this.chatForm.value.message, photo: this.chatForm.value.photo}
      this.chatService.sendMessage(data)

    }

    this.chatForm.reset(
      {message: ' .'}
    )
    this.scrollToBottom(60);
  }

  // sendFile(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = {to: this.route.snapshot.params.user_id, message: reader.result}
  //     this.chatService.sendMessage(data)
  //     this.chatService.getMessages().subscribe(data => {
  //       this.store.dispatch(OtherActions.createChat({chat: data}))
  //     })
  //   }
  //   reader.readAsDataURL(file);
  // }

  private scrollToBottom(num: number): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight + num;
    } catch (err) {
    }
  }

}

