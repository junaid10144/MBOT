import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as env } from '@environments/environment';
// import { User } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private userSubject: BehaviorSubject<User | null>;
  private userSubject: BehaviorSubject<any | null>;
    //public user: Observable<User | null>;
    public user: Observable<any>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${env.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    signup(userobj: any) {
        return this.http.post<any>(`${env.apiUrl}/users/register`, userobj)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    register(inputdata: any) {
        return this.http.post(`${env.apiUrl}/users/register`, inputdata);
    }
}
