import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService, DictionaryApiService, DictionaryService, TokenStorageService } from '@app/services';
import { JwtHelperService } from '@app/helpers';

import { LocalStorageService } from '@rars/ngx-webstorage';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    TokenStorageService,
    LocalStorageService,
    JwtHelperService,
    HttpClientTestingModule,
    DictionaryService,
    DictionaryApiService
  ]
})
export class ApiModule { }
