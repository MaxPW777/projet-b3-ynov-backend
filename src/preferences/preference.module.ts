import { Module } from '@nestjs/common';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preference } from '../entities/preference.entity';
import { Interest } from '../entities/interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Preference, Interest])],
  controllers: [PreferenceController],
  providers: [PreferenceService],
})
export class PreferenceModule {}
