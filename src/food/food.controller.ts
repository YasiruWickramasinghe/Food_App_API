import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { FoodService } from './food.service';
import { GetUser } from 'src/auth/decorator';
import { CreateFoodDto, EditFoodDto } from './dto';

// Apply JwtGuard authentication to all routes in this controller.
@UseGuards(JwtGuard)
@Controller('foods') 
export class FoodController {

    constructor(
        private foodService: FoodService,
    ) { }

    // Handle GET request to '/foods' route.
    @Get() 
    getAllFoods() {
        return this.foodService.getAllFoods(); // Retrieve all food items.
    }

    // Handle GET request to '/foods/user' route.
    @Get('user') 
    getFoodsByUserId(@GetUser('id') userId: number) {
        return this.foodService.getFoodsByUserId(
            userId,
        ); // Retrieve food items by user ID.
    }

    // Handle GET request to '/foods/:id' route.
    @Get(':id') 
    getFoodByBookId(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) foodId: number,
    ) {
        return this.foodService.getFoodByBookId(
            userId,
            foodId,
        ); // Retrieve a specific food item by user and food ID.
    }

    // Handle POST request to '/foods' route.
    @Post() 
    createFood(
        @GetUser('id') userId: number,
        @Body() dto: CreateFoodDto,
    ) {
        return this.foodService.createFood(
            userId,
            dto,
        ); // Create a new food item associated with a user.
    }

    // Handle PATCH request to '/foods/:id' route.
    @Patch(':id') 
    editFoodById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) foodId: number,
        @Body() dto: EditFoodDto,
    ) {
        return this.foodService.editFoodById(
            userId,
            foodId,
            dto,
        ); // Edit a food item's details by user and food ID.
    }

    // Handle DELETE request to '/foods/:id' route.
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id') 
    deleteFoodById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) foodId: number,
    ) {
        return this.foodService.deleteFoodById(
            userId,
            foodId,
        ); // Delete a food item based on user and food ID.
    }
}
