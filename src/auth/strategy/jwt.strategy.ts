import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,    // Extending the PassportStrategy class with the JWT strategy.
  'jwt',       // Name of the strategy (can be used for multiple strategies).
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      // Configure the JWT strategy using options.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header.
      secretOrKey: config.get('JWT_SECRET'), // Use JWT secret from configuration.
    });
  }

  // Validate method to verify the JWT token and retrieve user details.
  async validate(payload: {
    sub: number;     
    email: string;   
    role: string;
  }) {
    // Retrieve user details from the database using the user ID from the payload.
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    // Remove sensitive information (password hash) before returning the user object.
    delete user.hash;

    return user; // Return the validated user.
  }
}
