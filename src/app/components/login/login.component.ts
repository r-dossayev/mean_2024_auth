import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import * as AuthActions from "../../state/auth/auth.actions";

import {Store} from "@ngrx/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private store: Store<any>,
    private authService: AuthService
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
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value)
        .subscribe(
          res => {
            console.log(res)
            this.store.dispatch(AuthActions.loginSuccess({user: res}))
          },
          err => {
            console.log(err)
            this.store.dispatch(AuthActions.loginFailure({error: err.error.message}))
          }
        )
    }
  }

}
