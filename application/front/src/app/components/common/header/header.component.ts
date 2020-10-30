import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Role } from '@app/models';
import { TokenStorageService, UserService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public toggleMenu = false;

  public get isEditor(): boolean {
    if (this.userService.getUser()) {
      return this.userService.getUser().roles[0] === Role.Editor;
    }
    return false;
  }

  constructor(
    public userService: UserService,
    private router: Router,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.tokenService.disconnect();
    this.userService.resetUser();
    this.router.navigate(['auth/login']);
  }

}
