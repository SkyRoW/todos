import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { ListDal } from '../dal/list.dal';
import { UserService } from '../../user/service/user.service';
import { ListMappingService } from './list-mapping.service';
import { User } from '../../user/entity/user.entity';

describe('ListService', () => {
  let listService: ListService;
  let userService: jest.Mocked<UserService>;
  
  const userWithLists = {
    ...new User(),
    id: 'user1',
    createdLists: [
      {
        id: 'id1',
        name: 'list1',
        creatorId: 'user1',
        items: [
          {
            id: '1234',
            title: 'item1',
            freeText: 'text1',
            deadline: new Date(),
            creatorId: 'user1',
            todoListId: 'id1',
          }
        ]
      }
    ],
    collaboratedLists: []
  }

  const userListsPayload = {
    createdLists: [
      {
        id: 'id1',
        name: 'list1',
        items: [
          {
            id: '1234',
            title: 'item1',
            freeText: 'text1',
            deadline: new Date(),
          }
        ]
      }
    ],
    collaboratedLists: []
  }

  beforeEach(async () => { 
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        ListMappingService,
        {
          provide: ListDal,
          useValue: {
            
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserWithListsById: jest.fn().mockResolvedValue(userWithLists)
          }
        }
      ],
    }).compile();

    listService = module.get<ListService>(ListService);
    userService = module.get(UserService) as jest.Mocked<UserService>;
  });

  describe('getUserLists', () => {
    it ('should get created and collaborated lists for user', async () => {
      // setup
      const userId = 'user1';

      // logic
      const result = await listService.getUserLists(userId);

      // expectation
      expect(userService.getUserWithListsById).toHaveBeenCalled();
      expect(result).toEqual(userListsPayload);
    });
  });
});