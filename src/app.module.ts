import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CognitoStrategy } from './auth/cognito.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PreferenceModule } from './preferences/preference.module';
import { Constants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { Preference } from './entities/preference.entity';
import { Interest } from './entities/interest.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Constants.DATABASE_HOST,
      port: Constants.DATABASE_PORT,
      username: Constants.DATABASE_USER,
      password: Constants.DATABASE_PASSWORD,
      entities: [Interest, Preference, UserProfile],
      database: Constants.DATABASE_NAME,
      synchronize: true,
    }),
    AuthModule,
    PreferenceModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, CognitoStrategy],
})
export class AppModule {}
