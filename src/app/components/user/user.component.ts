import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {ActivatedRoute, ParamMap, Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  user!: User

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('user_id')
      if (id) {
        this.userService.getUserById(id).subscribe((res: User) => {
            this.user = res
          },
          (err) => {
            console.log(err)
            this.router.navigate(['/'])
          }
        )
      } else {
        this.router.navigate(['/'])
      }

    })
  }
}
