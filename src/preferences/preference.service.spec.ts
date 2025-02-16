import { getRepositoryToken } from '@nestjs/typeorm';
import { Preference } from '../entities/preference.entity';
import { Interest } from '../entities/interest.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceService } from './preference.service';

describe('PreferenceService', () => {
  let service: PreferenceService;
  let preferenceRepository: Repository<Preference>;
  let interestRepository: Repository<Interest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferenceService,
        {
          provide: getRepositoryToken(Preference),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Interest),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PreferenceService>(PreferenceService);
    preferenceRepository = module.get<Repository<Preference>>(
      getRepositoryToken(Preference),
    );
    interestRepository = module.get<Repository<Interest>>(
      getRepositoryToken(Interest),
    );
  });

  it('should update preference interests', async () => {
    const preference = new Preference();
    preference.id = 1;
    // Initialize interests so that later assignment works as expected.
    preference.interests = [];

    // When updating the preference, the service calls findOne with relations.
    jest.spyOn(preferenceRepository, 'findOne').mockResolvedValue(preference);
    // Simulate that no interest exists yet.
    jest.spyOn(interestRepository, 'findOne').mockResolvedValue(null);
    // When create() is called, return an object with the provided description.
    jest
      .spyOn(interestRepository, 'create')
      .mockImplementation((data: { description: string }) => {
        return { ...data } as Interest;
      });
    // When save() is called for an interest, resolve with that interest.
    jest
      .spyOn(interestRepository, 'save')
      .mockImplementation((interest) => Promise.resolve(interest as Interest));
    // When saving the preference, resolve with the same preference object.
    jest.spyOn(preferenceRepository, 'save').mockResolvedValue(preference);

    const result = await service.updatePreferenceInterests(1, [
      'interest1',
      'interest2',
    ]);
    expect(result).toBe(preference);
    // Optionally, check that the interests array was updated correctly.
    expect(preference.interests).toEqual([
      { description: 'interest1' },
      { description: 'interest2' },
    ]);
  });

  it('should throw error if preference not found', async () => {
    jest.spyOn(preferenceRepository, 'findOne').mockResolvedValue(null);

    await expect(
      service.updatePreferenceInterests(1, ['interest1', 'interest2']),
    ).rejects.toThrow('Preference not found');
  });

  it('should get preferences by user id', async () => {
    const preferences = [new Preference()];
    jest.spyOn(preferenceRepository, 'find').mockResolvedValue(preferences);

    // If your service logs user_id.user, consider updating the service or passing an object.
    const result = await service.getPreferences('user1');
    expect(result).toBe(preferences);
  });

  it('should get all preferences', async () => {
    const preferences = [new Preference()];
    jest.spyOn(preferenceRepository, 'find').mockResolvedValue(preferences);

    const result = await service.getAllPreferences();
    expect(result).toBe(preferences);
  });
});
