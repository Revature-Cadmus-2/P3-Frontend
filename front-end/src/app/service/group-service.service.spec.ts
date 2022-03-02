import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GroupServiceService } from './group-service.service';

describe('GroupServiceService', () => {
  let service: GroupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ HttpClientTestingModule ] });
    service = TestBed.inject(GroupServiceService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
