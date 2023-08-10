import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  // Declare the controller responsible for food-related routes.
  controllers: [FoodController],
  // Provide the service responsible for food-related operations.
  providers: [FoodService]
})
export class FoodModule { }
