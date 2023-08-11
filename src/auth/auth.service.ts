import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    // Sign up a new user and return an access token.
    async signup(dto: SignupDto) {
        // Generate the password hash using Argon2.
        const hash = await argon.hash(dto.password);

        try {
            // Save the new user in the database.
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    userRole: dto.userRole,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                },
            });

            // Return an access token.
            return this.signToken(user.id, user.email);
        } catch (error) {
            // Handle specific database errors.
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }
    }

    // Sign in a user and return an access token.
    async signin(dto: AuthDto) {
        // Find the user by email.
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // Throw an exception if the user does not exist.
        if (!user) throw new ForbiddenException('Credentials incorrect');

        // Compare the provided password with the stored hash.
        const pwMatches = await argon.verify(user.hash, dto.password);

        // Throw an exception if the password is incorrect.
        if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

        // Return an access token.
        return this.signToken(user.id, user.email);
    }

    // Sign a token with user ID and email, and return it.
    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId, // Subject of the token (user ID).
            email,       // Additional data (email).
        };
        const secret = this.config.get('JWT_SECRET'); // Get the JWT secret from configuration.

        // Generate a JWT token with the payload and secret.
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m', // Token expiration time.
            secret: secret,
        });

        // Return the access token.
        return {
            access_token: token,
        };
    }
}
