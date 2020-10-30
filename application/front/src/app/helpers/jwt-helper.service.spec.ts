import { TestBed, inject } from '@angular/core/testing';

import { JwtHelperService } from './jwt-helper.service';

describe('JwtHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtHelperService]
    });
  });

  it('should be created', inject([JwtHelperService], (service: JwtHelperService) => {
    expect(service).toBeTruthy();
  }));

  // tslint:disable:max-line-length
  it('should decode a JWT token', inject([JwtHelperService], (service: JwtHelperService) => {
    // Example token given by JWT.io
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

    /**
     * `toThrow()` and `toThrowError()` need a function in the `expect()` asserts.
     * According to this topic: https://stackoverflow.com/a/4144803/2724204
     *
     */
    expect(() => service.decodeToken('')).toThrowError('JWT must have 3 parts');
    expect(() => service.decodeToken('test.test')).toThrowError('JWT must have 3 parts');
    expect(() => service.decodeToken('a.2.')).toThrowError('Illegal base64url string');
    expect(service.decodeToken(token)).toBeTruthy();
  }));
});
