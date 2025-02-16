import { IsString } from 'class-validator';

export class UpdatePreferenceDto {
  @IsString({ each: true })
  data: string[];
}
