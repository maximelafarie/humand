import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetTokenGuard } from '@app/guards/reset-token.guard';
import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthenticationComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'forgot-password',
            component: ForgotPasswordComponent
          },
          {
            path: 'reset-password/:token',
            component: ResetPasswordComponent,
            // canActivate: [ResetTokenGuard],
            data: {
              mode: 'reset',
              title: 'Reset your password'
            }
          },
          {
            path: 'account-activation/:token',
            component: ResetPasswordComponent,
            // canActivate: [ResetTokenGuard],
            data: {
              mode: 'activate',
              title: 'Activate your account'
            }
          },
          {
            path: '**',
            redirectTo: 'login',
            pathMatch: 'full',
          }
        ]
      }
    ]),

    LoginModule,
    ForgotPasswordModule,
    ResetPasswordModule
  ],
  exports: [AuthenticationComponent]
})
export class AuthenticationModule { }
