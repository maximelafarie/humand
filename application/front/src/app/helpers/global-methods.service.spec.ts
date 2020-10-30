import { TestBed } from '@angular/core/testing';

import { GlobalMethodsService } from './global-methods.service';

describe('GlobalMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GlobalMethodsService]
  }));

  it('should be created', () => {
    const service: GlobalMethodsService = TestBed.inject(GlobalMethodsService);
    expect(service).toBeTruthy();
  });
});
