import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ValidationMessages } from "src/common/constants/validation.messages";
export class CreateUserDto {
    @IsEmail({}, {message: ValidationMessages.EMAIL.INVALID})
    @IsNotEmpty({message: ValidationMessages.EMAIL.REQUIRED})
    email!: string;
  
    @IsNotEmpty({message: ValidationMessages.PASSWORD.REQUIRED})
    @IsString({message: ValidationMessages.PASSWORD.MUST_BE_STRING})
    @MinLength(3, {message: ValidationMessages.PASSWORD.MIN_LENGTH})
    password!: string;
}