import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard) // Apply JwtGuard authentication to all routes in this controller.
@Controller('users') // Define the base route path for the controller.
export class UserController {

    constructor(private userService: UserService) {}

    // Handle GET request to '/users/me' route.
    @Get('me') 
    getMe(@GetUser() user: User) {
      return user; 
    } // Return the authenticated user's information.

    // Handle PATCH request to '/users/:id' route.
    @Patch(':id') 
    editUser(
      @GetUser('id') userId: number, 
      @Body() dto: EditUserDto,      
    ) {
      return this.userService.editUser(userId, dto); 
    } // Delegate user editing to the UserService.
}
