export class CreateUserDto {
  id: number;
  email: string;
  password: string;
  password_confirmation: string;
  credits: number;
}
