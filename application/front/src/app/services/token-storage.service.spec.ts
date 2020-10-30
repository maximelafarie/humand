import { TestBed } from '@angular/core/testing';

import { JwtHelperService } from '@app/helpers';
import { TokenStorageService } from './token-storage.service';

import { LocalStorageService } from '@rars/ngx-webstorage';
import * as moment from 'moment';

describe('TokenStorageService', () => {
  let service: TokenStorageService;
  let lss: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        JwtHelperService,
        TokenStorageService
      ]
    });

    service = TestBed.inject(TokenStorageService);
    lss = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token', () => {
    spyOn(lss, 'store');

    service.setToken('token', 'auth');

    expect(lss.store).toHaveBeenCalledWith('auth', 'token');
  });

  it('should delete token', () => {
    spyOn(lss, 'clear');

    service.deleteToken('token');

    expect(lss.clear).toHaveBeenCalled();
  });

  it('should disconnect', () => {
    spyOn(service, 'deleteToken');

    service.disconnect();

    expect(service.deleteToken).toHaveBeenCalled();
  });

  it('should store auth token', () => {
    spyOn(lss, 'store');

    service.setAuthToken('token');

    expect(lss.store).toHaveBeenCalledWith('auth_token', 'token');
  });

  it('should get token', () => {
    spyOn(lss, 'retrieve');

    service.getToken('id');

    expect(lss.retrieve).toHaveBeenCalledWith('id');
  });

  it('should return true because token is present', () => {
    spyOn(lss, 'retrieve').and.returnValue('token');

    expect(service.hasToken('id')).toBeTruthy();
  });

  it('should return false because token is not present', () => {
    spyOn(lss, 'retrieve').and.returnValue(false);

    expect(service.hasToken('id')).toBeFalsy();
  });

  it('should return true because he is authenticate', () => {
    spyOn(lss, 'retrieve').and.returnValue(true);
    spyOn(service, 'isExpired').and.returnValue(false);

    expect(service.isAuthenticate()).toBeTruthy();
  });

  it('should return false because he is not authenticate', () => {
    spyOn(lss, 'retrieve').and.returnValue(false);
    spyOn(service, 'isExpired').and.returnValue(false);

    expect(service.isAuthenticate()).toBeFalsy();
  });

  it('should return false because he is authenticate but expired', () => {
    spyOn(lss, 'retrieve').and.returnValue(false);
    spyOn(service, 'isExpired').and.returnValue(true);

    expect(service.isAuthenticate()).toBeFalsy();
  });

  it('should return true because he is expired', () => {
    spyOn(service, 'getInfo').and.returnValue(moment().add(5, 'days'));

    expect(service.isExpired()).toBeTruthy();
  });

  it('should return false because he is not expired', () => {
    spyOn(service, 'getInfo').and.returnValue(moment().subtract(5, 'days'));

    expect(service.isExpired()).toBeFalsy();
  });

  it('should get info', () => {
    const jwtHelper = TestBed.inject(JwtHelperService);

    spyOn(jwtHelper, 'decodeToken').and.returnValue({ data: 'data' });
    spyOn(service, 'getToken').and.returnValue('token');

    const res = service.getInfo('data');

    expect(service.getToken).toHaveBeenCalledWith('auth_token');
    expect(jwtHelper.decodeToken).toHaveBeenCalledWith('token');
    expect(res).toEqual('data');
  });
});
