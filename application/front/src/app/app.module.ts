import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards';
import { AuthInterceptorService, TokenStorageService, UserService } from './services';
import { JwtHelperService } from './helpers';

import { LocalStorageService, Ng2Webstorage } from '@rars/ngx-webstorage';
import { NgSelectConfig } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    Ng2Webstorage.forRoot({
      prefix: 'humand',
      separator: '.',
      caseSensitive: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: NgSelectConfig,
      useValue: {
        notFoundText: 'No result'
      }
    },

    AuthGuard,
    TokenStorageService,
    JwtHelperService,
    LocalStorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
