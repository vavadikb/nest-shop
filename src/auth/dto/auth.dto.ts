import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30) 
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
