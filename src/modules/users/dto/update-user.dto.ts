import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ValidationMessages } from "src/common/constants/validation.messages";
export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty({message: ValidationMessages.EMAIL.REQUIRED})
    @IsEmail({}, {message: ValidationMessages.EMAIL.INVALID})
    email?: string;
  
    @IsOptional()
    @IsNotEmpty({message: ValidationMessages.PASSWORD.REQUIRED})
    @IsString({message: ValidationMessages.PASSWORD.MUST_BE_STRING})
    @MinLength(3, {message: ValidationMessages.PASSWORD.MIN_LENGTH})
    passwordHash?: string;

    @IsOptional()
    @IsEnum(["USER", "ADMIN"], {message: ValidationMessages.ROLE.INVALID})
    role?: string;

    @IsOptional()
    @IsEnum(["ACTIVE", "BANNED"], {message: ValidationMessages.STATUS.INVALID})
    status?: string;
}