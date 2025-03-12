import { TestBed } from '@angular/core/testing';

import { SelectFiltersService } from './select-filters.service';

describe('SelectFiltersService', () => {
  let service: SelectFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
