import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DictionaryTranslatePipe } from './dictionary-translate.pipe';
import { DictionaryService, DictionaryApiService } from '@app/services';

describe('DictionaryTranslatePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DictionaryService,
        DictionaryApiService
      ]
    });
  });

  it('should create an instance', () => {
    const dictionaryService = TestBed.inject(DictionaryService);
    const pipe = new DictionaryTranslatePipe(dictionaryService);
    expect(pipe).toBeTruthy();
  });
});
