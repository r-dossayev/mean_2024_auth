import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import * as AuthActions from "../../state/auth/auth.actions";

import {Store} from "@ngrx/store";
import * as AuthSelectors from "../../state/auth/auth.selector";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  $error!: string | null;

  constructor(
    private store: Store<any>,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {


    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    console.log(this.loginForm.value)
    if (!this.loginForm.invalid) {
      this.authService.login(this.loginForm.value)
        .subscribe(
          res => {
            console.log(res)
            this.store.dispatch(AuthActions.loginSuccess({user: res}))
            this.router.navigate(['/'])
          },
          err => {
            console.log(err)
            this.store.dispatch(AuthActions.loginFailure({error: err.statusText}))
            this.store.select(AuthSelectors.selectAuthError).subscribe(
              error => this.$error = error
            )
          }
        )
    }
  }

}
