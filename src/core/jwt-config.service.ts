import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private configService: ConfigService){}
    
    createJwtOptions(): JwtModuleOptions {
        return {
            global: true,
            secret: this.configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: this.configService.get<number>('ACCESS_TOKEN_TIME'),
            }
        }
    }
}