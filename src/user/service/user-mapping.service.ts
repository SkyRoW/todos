import { Injectable } from "@nestjs/common";
import { User } from "../entity/user.entity";
import { UserPayload } from "../model/user.payload";

@Injectable()
export class UserMappingService {
    public mapUserToUserPayload(user: User): UserPayload {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    }
}