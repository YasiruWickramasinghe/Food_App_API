import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  // Specify the controller that handles user-related HTTP requests.
  controllers: [UserController], 
  // Provide the service responsible for user-related operations.
  providers: [UserService]       
})
export class UserModule {}
