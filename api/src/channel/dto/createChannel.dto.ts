import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChannelDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
