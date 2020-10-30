import { Injectable } from '@angular/core';

import { JwtHelperService } from '@app/helpers';

import { LocalStorageService } from '@rars/ngx-webstorage';
import * as moment from 'moment';

@Injectable()
export class TokenStorageService {

  constructor(
    private lss: LocalStorageService,
    private jwtHelper: JwtHelperService) {
  }

  /**
   * Set the token in the service and in the localStorage
   */
  public setToken(token: string, id: string): void {
    this.lss.store(id, token);
  }

  /**
   * Set the auth token in the service and in the localStorage
   */
  public setAuthToken(token: string): void {
    this.lss.store('auth_token', token);
  }

  /**
   * Get the token from the service or from the localStorage if not found
   */
  public getToken(id: string): string {
    return this.lss.retrieve(id);
  }

  /**
   * Check if token is set in the service or in the localStorage
   */
  public hasToken(id: string): boolean {
    return this.lss.retrieve(id) && this.lss.retrieve(id).length;
  }

  /**
   * Remove the token from the service and from the localStorage
   *
   */
  public deleteToken(id: string): void {
    this.lss.clear(id);
  }

  /**
   * Check if token is set in the localStorage
   */
  public isAuthenticate(): boolean {
    return !!this.lss.retrieve('auth_token') && !this.isExpired();
  }

  public isExpired(): boolean {
    return moment(this.getInfo('exp')).isAfter(moment());
  }

  /**
   * Disconnect user by delete token and account type
   */
  public disconnect() {
    this.deleteToken('auth_token');
    this.deleteToken('refresh_token');
  }
  /**
   * Get user info
   */

  public getInfo(data: string) {
    const decodeToken = this.jwtHelper.decodeToken(this.getToken('auth_token'));
    if (decodeToken.hasOwnProperty(data)) {
      return decodeToken[data];
    }
  }
}
