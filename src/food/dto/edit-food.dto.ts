import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// DTO (Data Transfer Object) used for editing food item information.
export class EditFoodDto {
  // Property must be a string.
  @IsString()   
  // Property is optional.     
  @IsOptional()      
  foodName?: string; 

  @IsString()        
  @IsOptional()      
  description?: string; 

  @IsNumber()       
  @IsOptional()      
  price?: number;    
}
