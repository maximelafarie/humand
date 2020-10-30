import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Dictionary } from '@app/models';
import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class DictionaryApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getDictionaries(): Observable<Dictionary[]> {
    return this.http.get<any>(environment.httpdBackHost + '/dictionaries');
  }

  public getDictionary(name: string): Observable<Dictionary> {
    return this.http.get<any>(environment.httpdBackHost + '/dictionaries/' + name);
  }
}
