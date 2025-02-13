import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PreferenceService } from './preference.service';

@UseGuards(AuthGuard('jwt'))
@Controller('preferences')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Get('all')
  public async getAllPreferences() {
    return await this.preferenceService.getAllPreferences();
  }

  @Get()
  public async getPreferences(@Req() req: any) {
    const { userId } = req.user;
    return await this.preferenceService.getPreferences(userId);
  }

  @Put()
  public async updatePreferences(@Req() req: any) {
    const { userId, username } = req.user;
    return await this.preferenceService.updatePreferenceInterests(
      userId,
      username,
    );
  }
}
