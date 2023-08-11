import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';

// Define the base route path for the controller.
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Handle POST request to '/auth/signup' route.
  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res() res: Response) {
    try {
      const user = await this.authService.signup(dto);
      // Respond with a success message and the user data.
      return res.status(HttpStatus.CREATED).json({ message: 'User signed up successfully', user });
    } catch (error) {
      // If an error occurs, respond with a generic error message.
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }

  // Handle POST request to '/auth/signin' route.
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const token = await this.authService.signin(dto);
      // Respond with a success message and the authentication token.
      return res.status(HttpStatus.OK).json({ message: 'User signed in successfully', token });
    } catch (error) {
      // If authentication fails, respond with an unauthorized error message.
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
  }
}
