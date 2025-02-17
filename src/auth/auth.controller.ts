import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }

  @Post('register')
  public async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('confirm')
  async confirm(@Body() body: ConfirmAccountDto) {
    return await this.authService.confirmAccount(body.username, body.code);
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    return await this.authService.refreshToken(body.refreshToken);
  }
}
