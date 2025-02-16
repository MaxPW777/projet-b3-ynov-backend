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
import { HttpRequestDto } from '../common/dto/http-request.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('preferences')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Get('all')
  public async getAllPreferences() {
    return await this.preferenceService.getAllPreferences();
  }

  @Get()
  public async getPreferences(@Req() req: HttpRequestDto) {
    return await this.preferenceService.getPreferences(req);
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
