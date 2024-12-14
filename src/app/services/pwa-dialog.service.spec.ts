import { TestBed } from '@angular/core/testing';

import { PwaDialogService } from './pwa-dialog.service';

describe('PwaDialogService', () => {
  let service: PwaDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
