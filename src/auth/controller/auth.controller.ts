import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { RegisterDto } from "../model/register-dto.model";
import { TokenPayload } from "../model/token-payload.model";
import { LoginDto } from "../model/login-dto.model";
import { Public } from "../decorator/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @Public()
    public async login(
        @Body() loginDto: LoginDto,
    ): Promise<TokenPayload> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @Public()
    public async register(
        @Body() registerDto: RegisterDto
    ): Promise<TokenPayload> {
        return this.authService.register(registerDto);
    }
}