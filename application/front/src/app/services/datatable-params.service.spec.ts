import { TestBed, inject } from '@angular/core/testing';

import { DatatableParamsService } from './datatable-params.service';

describe('DatatableParamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatatableParamsService],
    });
  });

  it('should be created', inject([DatatableParamsService], (service: DatatableParamsService) => {
    expect(service).toBeTruthy();
  }));
});
