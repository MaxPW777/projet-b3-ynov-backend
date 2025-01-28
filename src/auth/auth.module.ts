import { Module } from '@nestjs/common';
import { CognitoStrategy } from './cognito.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [CognitoStrategy, AuthService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
