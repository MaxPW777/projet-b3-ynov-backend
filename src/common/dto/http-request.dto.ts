export class HttpRequestDto extends Request {
  user: UserCredentialsDto;
}

export class UserCredentialsDto {
  userId: string;
  username: string;
  roles: string[];
}
