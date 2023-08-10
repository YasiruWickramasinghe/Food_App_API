import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// DTO (Data Transfer Object) used for creating a new food item.

export class CreateFoodDto {
  // Property must be a string.
  @IsString()
  // Property must not be empty.      
  @IsNotEmpty()
  foodName: string;

  @IsString()
  // Property is optional.       
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
