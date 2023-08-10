import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  // Import and configure the JWT module.
  imports: [JwtModule.register({})], 
  // Specify the controller for handling authentication routes.
  controllers: [AuthController],
  // Provide the authentication service and strategy.     
  providers: [AuthService, JwtStrategy] 
})
export class AuthModule {}
