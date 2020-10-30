import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '@app/api';
import { TokenStorageService } from '@app/services';
import { JwtHelperService } from '@app/helpers';

import { LocalStorageService } from '@rars/ngx-webstorage';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [LoginComponent],
  providers: [
    AuthenticationService,
    TokenStorageService,
    LocalStorageService,
    JwtHelperService
  ]
})
export class LoginModule { }
