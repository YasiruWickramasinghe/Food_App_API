import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  // Retrieve all users with specific fields selected.
  getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        userRole: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  // Retrieve user data by user ID with specific fields selected.
  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        userRole: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      // Throw a NotFoundException if user is not found.
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Edit user details based on user ID and DTO.
  async editUser(
    loggedInUser: User,
    userId: number,
    dto: EditUserDto,
  ) {
    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userToUpdate) {
      // Throw a NotFoundException if user is not found.
      throw new NotFoundException('User not found');
    }

    // Check if the logged-in user is authorized to edit the target user.
    if (loggedInUser.userRole !== 'admin' && loggedInUser.id !== userId) {
      // Throw an UnauthorizedException if the logged-in user is not authorized.
      throw new UnauthorizedException('You are not authorized to edit this user');
    }

    // Hash the provided password using Argon2.
    const hash = await argon.hash(dto.password);

    // Update the user's details and store the updated user data.
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: dto.email,
        hash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    // Delete the hash from the response for security reasons.
    delete updatedUser.hash;

    return updatedUser;
  }
}
