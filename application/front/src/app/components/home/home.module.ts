import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListModule } from './user-list/user-list.module';
import { HeaderModule } from '../common';
import { ApiModule } from '@app/modules';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: 'users',
            component: UserListComponent
          }
        ]
      }
    ]),

    UserListModule,
    HeaderModule,

    ApiModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
