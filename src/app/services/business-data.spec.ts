import { TestBed } from '@angular/core/testing';
import { BusinessData } from './business-data';

describe('BusinessData', () => {
  let service: BusinessData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Optional: example test using the methods
  it('should return a page of businesses', () => {
    const page1 = service.getBusinesses(1);
    expect(page1.length).toBeGreaterThan(0);
  });
});
