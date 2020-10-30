import { Component, OnInit } from '@angular/core';

import { TokenStorageService, UserService } from './services';
import { JwtHelperService } from '@app/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private jwtHelperService: JwtHelperService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.isAuthenticate()) {
      this.userService.setUser(this.jwtHelperService.decodeToken(this.tokenService.getToken('auth_token')));
    }
  }

}
