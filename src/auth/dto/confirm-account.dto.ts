import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmAccountDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
