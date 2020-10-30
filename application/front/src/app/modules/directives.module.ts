import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from '@app/directives';

@NgModule({
  declarations: [
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickOutsideDirective
  ]
})
export class DirectivesModule { }
