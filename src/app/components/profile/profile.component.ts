import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthService} from "../../services/auth.service";
import * as AuthActions from "../../state/auth/auth.actions";
import * as AuthSelectors from "../../state/auth/auth.selector";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isAuth$!: Observable<boolean>;
  authUser$!: Observable<User | null>;

  constructor(private store: Store<any>, private authService: AuthService) {

    this.authService.getUser().subscribe(data => {
      this.store.dispatch(AuthActions.loginSuccess({user: data.data}))
    })
    this.isAuth$ = this.store.select(AuthSelectors.selectIsAuthenticated)
    this.authUser$ = this.store.select(AuthSelectors.selectAuthUser)


  }

}
