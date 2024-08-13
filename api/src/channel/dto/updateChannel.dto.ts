import { IsOptional, IsString } from 'class-validator';

export class UpdateChannelDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
