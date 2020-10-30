import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DictionaryApiService } from './dictionary-api.service';
import { environment } from '@environments/environment';

describe('DictionaryApiService', () => {
  let service: DictionaryApiService;
  let backend: HttpTestingController;
  const apiUrl = environment.httpdBackHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DictionaryApiService]
    });

    service = TestBed.inject(DictionaryApiService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all dictionaries', async () => {
    service.getDictionaries().subscribe();
    backend.expectOne({
      url: apiUrl + '/dictionaries',
      method: 'GET'
    }, 'GET TO /dictionaries');
  });

  it('should get one dictionary', async () => {
    service.getDictionary('test').subscribe();
    backend.expectOne({
      url: apiUrl + '/dictionaries/test',
      method: 'GET'
    }, 'GET TO /dictionaries/:name');
  });
});
