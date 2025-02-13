import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PreferenceService } from './preference.service';
import { UpdatePreferenceDto } from './update-preference.dto';

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
    console.log(req.user);
    return await this.preferenceService.getPreferences(userId);
  }

  @Put('/:id')
  public async updatePreferences(
    @Param('id') id: number,
    @Body() body: UpdatePreferenceDto,
  ) {
    return await this.preferenceService.updatePreferenceInterests(
      id,
      body.data,
    );
  }
}
