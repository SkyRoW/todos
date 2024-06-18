import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsOptional()
    public firstName: string;

    @IsString()
    @IsOptional()
    public lastName: string;

    @IsEmail()
    public email: string;

    @IsStrongPassword()
    public password: string;
}