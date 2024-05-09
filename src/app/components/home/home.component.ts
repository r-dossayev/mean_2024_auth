import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as AuthActions from "../../state/auth/auth.actions";
import * as AuthSelectors from "../../state/auth/auth.selector";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Apollo} from "apollo-angular";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// @Injectable()
export class HomeComponent {
  userList$!: Observable<Array<User>>;
  isAuth$!: Observable<boolean>;
  $authUser!: Observable<User | null>;

  constructor(private store: Store<any>, private userService: UserService, private apollo: Apollo) {
    this.userService.getUsersGraph().subscribe((result: any) => {
      this.store.dispatch(AuthActions.userLists({users: result.data.getUsers}))
    });
    this.userList$ = this.store.select(AuthSelectors.selectUserList)
    this.isAuth$ = this.store.select(AuthSelectors.selectIsAuthenticated)
    this.$authUser = this.store.select(AuthSelectors.selectAuthUser)
  }

  ngOnInit(): void {

  }

}
