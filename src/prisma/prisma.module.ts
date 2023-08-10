import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Declare this module as global to make its providers available throughout the application.

@Global()
@Module({
  // Register the PrismaService as a provider for dependency injection.
  providers: [PrismaService], 
  // Make PrismaService available for use in other modules.
  exports: [PrismaService]    
})
export class PrismaModule {}
