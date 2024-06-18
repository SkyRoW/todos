import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserDal {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    public async getUserById(id: string): Promise<User> {
        return this.userRepository.findOneBy({id});
    }

    public async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({email});
    }

    public async saveUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    public async getUserWithListsById(userId: string): Promise<User> {
        return this.userRepository.findOne({where: {id: userId}, relations: [
            'createdLists',
            'createdLists.items',
            'collaboratedLists',
            'collaboratedLists.items',
        ]});
    }
}