// Import required modules and decorators from Nest.js and other custom modules.
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  // Import and configure the global configuration module for the application.
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration module available throughout the app.
    }),
    
    // Import other custom modules that define different parts of the application.
    AuthModule,   // Module for handling authentication and authorization.
    FoodModule,   // Module for managing food-related functionalities.
    UserModule,   // Module for user-related operations and management.
    PrismaModule, // Module for integrating with the Prisma ORM.
  ],
})
export class AppModule { }
