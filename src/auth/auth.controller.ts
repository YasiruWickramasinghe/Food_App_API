import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';

// Define the base route path for the controller.
@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService) {}

    // Handle POST request to '/auth/signup' route.
    @Post('signup')
    signup(@Body() dto: SignupDto) {
      return this.authService.signup(dto); // Call the signup method of the AuthService.
    }
  
    // Handle POST request to '/auth/signin' route.
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
      return this.authService.signin(dto); // Call the signin method of the AuthService.
    }
}
