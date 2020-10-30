import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthenticationService } from '@app/api';
import { ResetTokenGuard } from '@app/guards';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [ResetPasswordComponent],
  providers: [
    AuthenticationService,
    ResetTokenGuard
  ]
})
export class ResetPasswordModule { }
