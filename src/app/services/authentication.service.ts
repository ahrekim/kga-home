import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../app-config';
import { ContactForm } from "../models/ContactForm";
import { LoginForm, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  postLoginForm(loginForm: LoginForm): Observable<User> {
    const url = API_BASE_URL + '/api/public/login';

    return this.httpClient.post<User>(
      url,
      loginForm
    );
  }

  getStoredUser(): Observable<User> {
    var user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  setStoredUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));

  }

  deleteUser() {
    localStorage.removeItem("user");
  }
}
