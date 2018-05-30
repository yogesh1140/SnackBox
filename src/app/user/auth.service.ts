
import {throwError as observableThrowError, of as observableOf} from 'rxjs';

import {catchError, tap, map} from 'rxjs/operators';
import {Injectable, OnInit} from '@angular/core'
import {IUser} from './user.model'
import {Http, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/RX'
@Injectable()
export class AuthService {
    constructor(private http: Http) {}
    users: IUser[] = [{username: 'test', password: '123'}]
    currentUser: IUser
    //   login(username: string, password: string) {
    //       if (this.users.some(user =>
    //         user.userName.toLocaleLowerCase() === username.toLocaleLowerCase() && user.password === password)) {
    //         this.currentUser = {
    //             userName : username
    //           }
    //       }
    // }
    loginUser(username: string, password: string, remember_me: boolean) {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const loginInfo = { username: username, password: password, remember_me: remember_me };
        return this.http.post('/api/users/login', JSON.stringify(loginInfo), options).pipe(
        tap(resp => {
            // console.log(resp)
          if (resp) {
            this.currentUser = {username: resp.json().user.username};
            // console.log('changed', this.currentUser)
          }
        }),catchError(error => {
          return observableOf(false);
        }),)
      }
    isAuthenticated() {
        // console.log('ia', this.currentUser)
        if (this.currentUser !== undefined) {
        return true
        } else { return false
        }
       //  return !!this.currentUser;
    }
    checkAuthenticationStatus() {
        return this.http.get('/api/users/currentIdentity').pipe(map((response: any) => {
          if (response._body) {
            return response.json();
          } else {
            return {}
          }
        }),
        tap(user => {
           // console.log(user)
          if (user.username) {
             // console.log('updating')
            this.currentUser = user;
          }
        }),)
      }
      logout() {
        this.currentUser = undefined;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this.http.post('/api/users/logout', JSON.stringify({}), options);
      }
    checkIfExists(username: string) {
        return this.users.some(user => user.username === username)
    }
    registerUser(email: string, mobile: number, gender: string, password: string, username: string): Observable<any> {
       const user = {
                email: email, gender: gender, mobile: mobile, password: password, username: username
            }
            const headers = new Headers({ 'Content-Type': 'application/json'})
            const options = new RequestOptions({headers: headers})
            return this.http.post('/api/users/register', JSON.stringify({user: user}), options)
    }
    private handleError(error: Response) {
        console.log('api error')
        return observableThrowError(error.statusText);
    }
}
