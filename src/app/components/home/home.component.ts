import {Component, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as AuthActions from "../../state/auth/auth.actions";
import * as AuthSelectors from "../../state/auth/auth.selector";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Apollo} from "apollo-angular";
import {gql} from "@apollo/client";

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
  rates: any;
  // constructor(private store: Store<any>, private userService: UserService, private apollo: Apollo) {
  constructor(private store: Store<any>, private userService: UserService) {
    userService.getUsers().subscribe(users => {
      this.store.dispatch(AuthActions.userLists({users: users}))
    })
    this.userList$ = this.store.select(AuthSelectors.selectUserList)
    this.isAuth$ = this.store.select(AuthSelectors.selectIsAuthenticated)
    this.$authUser = this.store.select(AuthSelectors.selectAuthUser)

  }

  ngOnInit(): void {

    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //       {
    //         getUsers() {
    //           email
    //         }
    //       }
    //     `,
    //   })
    //   .valueChanges.subscribe((result: any) => {
    //   console.log(result.data)
    //   console.log(result.data?.users)
    //   this.rates = result.data?.users;
    // });
  }

}
