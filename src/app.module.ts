import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CognitoStrategy } from './auth/cognito.strategy';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, CognitoStrategy],
})
export class AppModule {}
