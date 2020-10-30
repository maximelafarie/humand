import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { environment } from '@environments/environment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let backend: HttpTestingController;
  const apiUrl = environment.httpdBackHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });

    service = TestBed.inject(AuthenticationService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', async () => {
    service.login({ username: 'test@humand.fr', password: 'test' }).subscribe();
    backend.expectOne({
      url: apiUrl + '/login',
      method: 'POST'
    }, 'POST TO /login');
  });

  it('should forgot password', async () => {
    service.forgotPassword('test@humand.fr').subscribe();
    backend.expectOne({
      url: apiUrl + '/forget-password',
      method: 'POST'
    }, 'POST TO /forget-password');
  });

  it('should reset password', async () => {
    service.resetPassword('token', 'test').subscribe();
    backend.expectOne({
      url: apiUrl + '/reset-password/token',
      method: 'POST'
    }, 'POST TO /reset-password/:token');
  });
});
