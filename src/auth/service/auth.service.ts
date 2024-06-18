import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenPayload } from "../model/token-payload.model";
import { RegisterDto } from "../model/register-dto.model";
import { UserService } from "../../user/service/user.service";
import { AuthHelper } from "../helper/auth.helper";
import { User } from "../../user/entity/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginDto } from "../model/login-dto.model";
import { UserMappingService } from "../../user/service/user-mapping.service";

@Injectable()
export class AuthService {
    private accessTokenTime;
    private refreshTokenTime;

    constructor(
        private userService: UserService,
        private userMappingService: UserMappingService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {
        this.accessTokenTime = Number(this.configService.get('ACCESS_TOKEN_TIME'));
        this.refreshTokenTime = Number(this.configService.get('REFRESH_TOKEN_TIME'));
    }

    public async register(registerDto: RegisterDto): Promise<TokenPayload> {
        const { email, password } = registerDto;

        const existingUser = await this.userService.getUserByEmail(email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const newUser = {
            ...new User(),
            ...registerDto,
            password: await AuthHelper.hashPassword(password),
        };
        const savedUser = await this.userService.saveUser(newUser);
        return {
           accessToken: await this.jwtService.signAsync(savedUser, { expiresIn: this.accessTokenTime }),
           refreshToken: await this.jwtService.signAsync(savedUser, { expiresIn: this.refreshTokenTime }),
        }
    }

    public async login(loginDto: LoginDto): Promise<TokenPayload> {
        const { email, password } = loginDto;

        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordCorrect = await AuthHelper.checkPassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const userPayload = this.userMappingService.mapUserToUserPayload(user);
        return {
            accessToken: await this.jwtService.signAsync(userPayload, { expiresIn: this.accessTokenTime }),
            refreshToken: await this.jwtService.signAsync(userPayload, { expiresIn: this.refreshTokenTime }),
        }
    }
}