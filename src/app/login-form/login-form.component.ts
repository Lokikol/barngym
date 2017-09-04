import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'barn-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  invalidLogin: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register($event) {
    console.log('register');
    $event.stopPropagation();
  }

  login(f) {
    let credentials = f.value;
    this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.invalidLogin = true;
        }
      });
  }

}
