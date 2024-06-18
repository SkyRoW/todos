import { UserPayload } from "../../user/model/user.payload";

export class TokenDataPayload {
    public user: UserPayload;
    public type: string;
}