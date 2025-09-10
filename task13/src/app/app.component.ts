import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})


export class AppComponent {
  username = '';
  password = '';
  loginError = '';

  constructor(public authService: AuthService) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.loginError = '';
    } else {
      this.loginError = 'Invalid credentials';
    }
  }

  logout() {
    this.authService.logout();
    this.username = '';
    this.password = '';
  }
}
