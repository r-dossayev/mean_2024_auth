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

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {


    chats$!: Observable<Chat[]>
    chatForm!: FormGroup;
    authUser$!: Observable<User | null>;

    constructor(private userService: UserService, private store: Store<any>, private route: ActivatedRoute, private router: Router) {

        // this.userService.getUserChats().subscribe(data => {
        //   this.store.dispatch(AuthActions.loginSuccess({user: data.data}))
        // })
        this.authUser$ = this.store.select(AuthSelectors.selectAuthUser)
        // this.isAuth$ = this.store.select(AuthSelectors.selectIsAuthenticated)
        // this.authUser$ = this.store.select(AuthSelectors.selectAuthUser)
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const id = params.get('user_id')
            if (id) {
               this.userService.getUserChats(id).subscribe(res => this.store.dispatch(OtherActions.loadChatsSuccess({chats:res})));
               this.chats$ = this.store.select(otherSelectors.selectChats)
                this.store.select(otherSelectors.selectChats).subscribe(res =>{
                    console.log(res)})

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
            const data = {to: this.route.snapshot.params.user_id, message: this.chatForm.value.message}
            this.userService.sendMessage(data).subscribe(res => this.store.dispatch(OtherActions.createChat({chat: res})),
                err => {
                    console.log(err)
                })
        }
        this.chatForm.reset()

    }

}
