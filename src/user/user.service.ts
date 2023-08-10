import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  // Edit user details using the provided DTO.
  async editUser(
    userId: number,   // ID of the user to be edited.
    dto: EditUserDto, // Data transfer object containing updated user information.
  ) {

    // Generate a secure password hash using Argon2.
    const hash = await argon.hash(dto.password);

    // Update user data in the database and retrieve the updated user.
    const user = await this.prisma.user.update({
      where: {
        id: userId,    // Specify the user ID to identify the user.
      },
      data: {
        email: dto.email,
        hash,           // Store the generated password hash.
        firstName: dto.firstName,
        lastName: dto.lastName
      },
    });

    delete user.hash; // Remove the hash from the returned user object for security.

    return user;       // Return the updated user data.
  }
}
