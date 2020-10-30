import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { TokenStorageService } from '@app/services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
  ) {}

  canActivate() {
    if (this.tokenService.isAuthenticate()) {
      return true;
    }

    this.router.navigate(['/auth/login']);

    return false;
  }
}
