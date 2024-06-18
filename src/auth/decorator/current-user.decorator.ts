import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import { UserPayload } from '../../user/model/user.payload';

export const CurrentUser = createParamDecorator((data, ctx: ExecutionContext): UserPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});