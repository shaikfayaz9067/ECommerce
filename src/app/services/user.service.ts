import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { elogin, esignUp } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: esignUp) {
    this.http
      .post('http://localhost:8081/api/eusers/signup', user, {
        observe: 'response',
      }) // Updated endpoint
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  userLogin(data: elogin) {
    this.http
      .post<esignUp>('http://localhost:8081/api/eusers/login', data, {
        observe: 'response',
      }) // Updated endpoint
      .subscribe((result) => {
        if (result && result.body) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
