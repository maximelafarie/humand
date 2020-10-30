import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';

import { ApiModule, DirectivesModule, PipesModule } from '@app/modules';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,

    ApiModule,
    PipesModule,
    DirectivesModule
  ],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderModule { }
