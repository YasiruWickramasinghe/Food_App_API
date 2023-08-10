// Import the necessary modules and classes from the Nest.js framework.
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Define an asynchronous function named 'bootstrap'.
async function bootstrap() {
  // Create an instance of the Nest application using the AppModule.
  const app = await NestFactory.create(AppModule);
  
  // Configure a global validation pipe to automatically validate incoming request data.
  app.useGlobalPipes(
    new ValidationPipe({
      // Enable whitelist mode to strip away any properties not explicitly defined in the DTO.
      whitelist: true, 
    }),
  );

  // Start the application, and have it listen on port 5000 for incoming requests.
  await app.listen(5000);
}

// Call the 'bootstrap' function to start the Nest application.
bootstrap();
