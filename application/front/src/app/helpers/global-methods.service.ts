import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class GlobalMethodsService {

  constructor() { }

  public generateQueryParameters(params: object): HttpParams {
    let parameters = new HttpParams();

    if (!!params) {
      Object.keys(params).forEach((key: string) => {
        const value = params[key];
        if ((value !== null && value !== undefined) || value.length > 0) {
          switch (key) {
            default:
              parameters = parameters.append(key, value);
          }
        }
      });
    }
    return parameters;
  }
}
