import { TestBed } from '@angular/core/testing';

import { MakeReservationService } from './make-reservation.service';

describe('MakeReservationService', () => {
  let service: MakeReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
