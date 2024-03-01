import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
    })
  }

  submitted() {
    console.log(this.registerForm.value)
    if (!this.registerForm.invalid) {
      console.log(this.registerForm.value)
      this.authService.register(this.registerForm.value)
        .subscribe(
          res => {
            console.log(res)
            this.router.navigate(['/login'])
          },
          err => {
            console.log(err)
          }
        )
    }
  }

}
