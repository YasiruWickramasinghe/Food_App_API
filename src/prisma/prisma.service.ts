import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// Injectable service that extends PrismaClient to provide database access.

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        // Call the constructor of the parent PrismaClient class with database configuration.
        super({
          datasources: {
            db: {
              url: config.get('DATABASE_URL'), // Use the database URL from configuration.
            },
          },
        });
    }
}
