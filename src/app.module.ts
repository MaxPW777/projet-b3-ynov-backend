import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CognitoStrategy } from './auth/cognito.strategy';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constants } from './constants';
import { AuthModule } from './auth/auth.module';
import { PreferenceModule } from './preferences/preference.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Constants.DATABASE_HOST,
      port: 5432,
      username: Constants.DATABASE_USER,
      password: Constants.DATABASE_PASSWORD,
      entities: ['/**/*.entity.js'],
      database: 'postgres',
      synchronize: true,
    }),
    AuthModule,
    PreferenceModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, CognitoStrategy],
})
export class AppModule {}
