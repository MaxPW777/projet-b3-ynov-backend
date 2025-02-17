import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpRequestDto } from '../common/dto/http-request.dto';
import { Preference } from '../common/entities/preference.entity';
import { Interest } from '../common/entities/interest.entity';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,

    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>,
  ) {}

  async updatePreferenceInterests(
    preferenceId: number,
    interestDescriptions: string[],
  ): Promise<Preference> {
    const preference = await this.preferenceRepository.findOne({
      where: { id: preferenceId },
    });
    if (!preference) {
      throw new Error('Preference not found');
    }

    const interests: Interest[] = [];
    for (const description of interestDescriptions) {
      let interest = await this.interestRepository.findOne({
        where: { description },
      });
      if (!interest) {
        interest = this.interestRepository.create({ description });
        interest = await this.interestRepository.save(interest);
      }
      interests.push(interest);
    }

    // Update the interests directly
    preference.interests = interests;
    return await this.preferenceRepository.save(preference);
  }

  public async getPreferences(req: HttpRequestDto): Promise<Preference[]> {
    return await this.preferenceRepository.find({
      where: { user_id: req.user.userId },
    });
  }

  public async getAllPreferences() {
    return await this.preferenceRepository.find();
  }
}
