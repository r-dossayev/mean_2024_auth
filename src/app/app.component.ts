import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthSelectors from "./state/auth/auth.selector";
import * as AuthActions from "./state/auth/auth.actions";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";
import {User} from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuth$!: Observable<boolean>;
  authUser$!: Observable<User | null>;

  constructor(private store: Store<any>, private authService: AuthService) {

    this.authService.getUser().subscribe(data => {
      this.store.dispatch(AuthActions.loginSuccess({user: data.data}))
    })
    this.isAuth$ = this.store.select(AuthSelectors.selectIsAuthenticated)
    this.authUser$ = this.store.select(AuthSelectors.selectAuthUser)


  }

  logout() {
    this.authService.logout().subscribe(data => {
      console.log(data)
      this.store.dispatch(AuthActions.logout())
    })
  }
}
