import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDal } from '../dal/user.dal';
import { User } from '../entity/user.entity';
import { UserPayload } from '../model/user.payload';
import { UserMappingService } from './user-mapping.service';

@Injectable()
export class UserService {
    constructor(
        private userDal: UserDal,
        private userMappingService: UserMappingService,
    ){}

    public async getUserById(userId: string): Promise<User> {
        const user = await this.userDal.getUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
 
    public async getUserByEmail(email: string): Promise<User> {
        return this.userDal.getUserByEmail(email);
    }

    public async getUserWithListsById(userId: string): Promise<User> {
        const user = await this.userDal.getUserWithListsById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    public async saveUser(user: User): Promise<UserPayload> {
        const savedUser = await this.userDal.saveUser(user);
        return this.userMappingService.mapUserToUserPayload(savedUser);
    }
}