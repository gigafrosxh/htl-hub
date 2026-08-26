import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PASSWORD_REPOSITORY } from '../db/user/password.repository';
import { USER_REPOSITORY } from '../db/user/user.repository';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: USER_REPOSITORY, useValue: {} },
        { provide: PASSWORD_REPOSITORY, useValue: {} },
        { provide: 'HTLHUB_REPOSITORY', useValue: {} },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
