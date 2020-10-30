import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserApiService } from './user-api.service';
import { GlobalMethodsService } from '@app/helpers';
import { environment } from '@environments/environment';

describe('UserApiService', () => {
  let service: UserApiService;
  let backend: HttpTestingController;
  const apiUrl = environment.httpdBackHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService, GlobalMethodsService]
    });

    service = TestBed.inject(UserApiService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', async () => {
    service.getUsers({}).subscribe();
    backend.expectOne({
      url: apiUrl + '/users',
      method: 'GET'
    }, 'GET TO /users');
  });

  it('should save user', async () => {
    service.saveUser({ id: 'id' }).subscribe();
    backend.expectOne({
      url: apiUrl + '/users/id',
      method: 'PUT'
    }, 'PUT TO /users/:id');
  });

  it('should create lead', async () => {
    service.createUser({}).subscribe();
    backend.expectOne({
      url: apiUrl + '/users',
      method: 'POST'
    }, 'POST TO /users');
  });
});
