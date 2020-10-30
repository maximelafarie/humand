import { Injectable } from '@angular/core';

import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  public get fullName(): string {
    if (this.hasUser()) {
      return this.user.lastName.toUpperCase() + ' ' + this.user.firstName;
    }
  }

  constructor() { }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public hasUser(): boolean {
    return !!this.user;
  }

  public resetUser(): void {
    this.user = null;
  }
}
