import { IsAlphanumeric, IsEmail, IsLowercase, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  @IsAlphanumeric('en-US', {
    message: 'Допустимы только символы латинского алфавита и цифры',
  })
  @IsLowercase({
    message: 'Допустимы только символы нижнего регистра',
  })
  username: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @Length(8, 24, {
    message: 'Пароль должен содержать от 8 до 24 символов',
  })
  @ApiProperty()
  rawPassword: string;
  @ApiProperty()
  roleName: string;
}
