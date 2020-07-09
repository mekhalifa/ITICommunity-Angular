import { TestBed } from '@angular/core/testing';

import { ApiLikeService } from './api-like.service';

describe('ApiLikeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiLikeService = TestBed.get(ApiLikeService);
    expect(service).toBeTruthy();
  });
});
