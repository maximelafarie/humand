import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(userCredentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(environment.httpdBackHost + '/login', userCredentials);
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(environment.httpdBackHost + '/forget-password', { email });
  }

  public resetPassword(token: string, password: string): Observable<any> {
    const body = {
      password
    };

    return this.http.post<any>(environment.httpdBackHost + '/reset-password/' + token, body);
  }

  public pingToken(token: string): Observable<any> {
    return this.http.post<any>(environment.httpdBackHost + '/reset-password/' + token, {});
  }
}
