import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

});
