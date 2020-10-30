import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '@app/api';

@Injectable()
export class ResetTokenGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  public async checkToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.pingToken(token).subscribe(res => {
        resolve(res);
      }, err => {
          reject(err);
      });
    });
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      await this.checkToken(next.params.token);
      return Promise.resolve(true);
    } catch (e) {
      this.router.navigate(['/auth/login']);
      return Promise.resolve(false);
    }
  }
}
