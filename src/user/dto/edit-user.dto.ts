import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// DTO (Data Transfer Object) used for editing user information.

export class EditUserDto {
  // Property must be a valid email address.
  @IsEmail() 
  // Property must not be empty.      
  @IsNotEmpty()    
  email?: string;  

  // Property must be a string.
  @IsString()      
  @IsNotEmpty()    
  password: string; 

  @IsString()      
  @IsOptional() 
  // Property is optional.   
  firstName?: string; 

  @IsString()      
  @IsOptional()    
  lastName?: string;  
}
