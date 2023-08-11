import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { RolesGuard } from './guard';
import { Roles } from './decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  // Retrieve all users with admin role.
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  async getAllUser(@Res() res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      // Respond with retrieved users and a success message.
      return res.status(HttpStatus.OK).json({
        message: 'Successfully retrieved users',
        users: users,
      });
    } catch (error) {
      // If an error occurs, respond with a generic error message.
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }

  // Retrieve user data for the currently authenticated user.
  @Get('me')
  async getMe(@GetUser() user: User, @Res() res: Response) {
    try {
      const userData = await this.userService.getUserById(user.id);
      // Respond with retrieved user data and a success message.
      return res.status(HttpStatus.OK).json({
        message: 'User data retrieved successfully',
        user: userData,
      });
    } catch (error) {
      // If an error occurs, respond with a generic error message.
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }

  // Edit user details by admin or the user themselves.
  @Patch(':id')
  async editUser(
    @GetUser() loggedInUser: User,
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: EditUserDto,
    @Res() res: Response
  ) {
    try {
      const editedUser = await this.userService.editUser(loggedInUser, userId, dto);
      // Respond with edited user data and a success message.
      return res.status(HttpStatus.OK).json({
        message: 'User edited successfully',
        data: editedUser,
      });
    } catch (error) {
      // If an error occurs, respond with a generic error message.
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }
}
