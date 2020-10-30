import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryTranslatePipe } from '@app/pipes';

@NgModule({
  declarations: [
    DictionaryTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DictionaryTranslatePipe
  ],
  exports: [
    DictionaryTranslatePipe
  ]
})
export class PipesModule {
  public static forRoot() {
    return {
      ngModule: PipesModule,
      providers: []
    };
  }
}
