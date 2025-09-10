import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private users:User[] = [
  {username:"jana",password:"password"},
  {username:"yassin",password:"password"}

]

 private loggedInUser: User | null = null;

  constructor() { }

  
  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedInUser = user;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInUser = null;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getUser(): User | null {
    return this.loggedInUser;
  }
}
