import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { UpdatePreferenceDto } from './update-preference.dto';
import { APP_GUARD } from '@nestjs/core';
import { Preference } from '../entities/preference.entity';

describe('PreferenceController', () => {
  let controller: PreferenceController;
  let service: PreferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferenceController],
      providers: [
        {
          provide: PreferenceService,
          useValue: {
            getAllPreferences: jest.fn(),
            getPreferences: jest.fn(),
            updatePreferenceInterests: jest.fn(),
          },
        },
        // Override the global auth guard so that it always returns true
        {
          provide: APP_GUARD,
          useValue: { canActivate: () => true },
        },
      ],
    }).compile();

    controller = module.get<PreferenceController>(PreferenceController);
    service = module.get<PreferenceService>(PreferenceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all preferences', async () => {
    const preferences: Preference[] = [{ id: 1, user_id: '1', max_age: 30 }];
    jest.spyOn(service, 'getAllPreferences').mockResolvedValue(preferences);

    const result = await controller.getAllPreferences();
    expect(result).toBe(preferences);
  });

  it('should return preferences for a user', async () => {
    const preferences: Preference[] = [
      { id: 1, user_id: 'user1', min_age: 20 },
    ];
    jest.spyOn(service, 'getPreferences').mockResolvedValue(preferences);

    // Pass a fake request object with a user property
    const req = { user: { userId: 'user1' } };
    const result = await controller.getPreferences(req);
    expect(result).toBe(preferences);
  });

  it('should update preferences', async () => {
    const updatedPreference: Preference = {
      id: 1,
      user_id: '1',
      max_distance: 15.4,
    };
    jest
      .spyOn(service, 'updatePreferenceInterests')
      .mockResolvedValue(updatedPreference);

    const updateDto: UpdatePreferenceDto = { data: ['interest1', 'interest2'] };
    const result = await controller.updatePreferences(1, updateDto);
    expect(result).toBe(updatedPreference);
  });

  it('should throw error if update preferences fails', async () => {
    jest
      .spyOn(service, 'updatePreferenceInterests')
      .mockRejectedValue(new Error('Update failed'));

    const updateDto: UpdatePreferenceDto = { data: ['interest1', 'interest2'] };
    await expect(controller.updatePreferences(1, updateDto)).rejects.toThrow(
      'Update failed',
    );
  });
});
