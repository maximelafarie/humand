import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@app/helpers';
import { LocalStorageService } from '@rars/ngx-webstorage';

import { AuthInterceptorService } from './auth-interceptor.service';
import { TokenStorageService } from './token-storage.service';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthInterceptorService,
        TokenStorageService,
        LocalStorageService,
        JwtHelperService
      ]
    });
    service = TestBed.inject(AuthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
