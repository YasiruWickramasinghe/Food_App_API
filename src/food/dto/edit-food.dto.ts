import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditFoodDto {
  @IsString()
  @IsOptional()
  foodName?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  price?: string;
}
