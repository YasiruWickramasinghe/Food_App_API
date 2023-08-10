import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  foodName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}
