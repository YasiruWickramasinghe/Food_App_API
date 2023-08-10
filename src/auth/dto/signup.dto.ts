import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

// DTO (Data Transfer Object) used for user registration (signup).

export class SignupDto {
  // Property must be a valid email address.
  @IsEmail()   
  // Property must not be empty.      
  @IsNotEmpty()      
  email: string;     

  // Property must be a string.
  @IsString()        
  @IsNotEmpty()      
  password: string;  

  @IsString()        
  @IsNotEmpty()      
  firstName: string; 

  @IsString()        
  @IsNotEmpty()      
  lastName: string;  
}
