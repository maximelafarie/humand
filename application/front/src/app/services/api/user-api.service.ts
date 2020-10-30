import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalMethodsService } from '@app/helpers';

import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class UserApiService {

  constructor(
    private http: HttpClient,
    private gms: GlobalMethodsService
  ) { }

  public getUsers(params: any): Observable<any> {
    const parameters = this.gms.generateQueryParameters(params);
    return this.http.get<any>(environment.httpdBackHost + '/users', { params: parameters });
  }

  public saveUser(user: any): Observable<any> {
    return this.http.put<any>(environment.httpdBackHost + '/users/' + user.id, user);
  }

  public createUser(user: any): Observable<any> {
    return this.http.post<any>(environment.httpdBackHost + '/users', user);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(environment.httpdBackHost + '/users/' + id);
  }
}
