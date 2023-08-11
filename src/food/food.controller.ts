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
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { FoodService } from './food.service';
import { GetUser } from 'src/auth/decorator';
import { CreateFoodDto, EditFoodDto } from './dto';
import { RolesGuard } from 'src/user/guard';
import { Roles } from 'src/user/decorator';

@UseGuards(JwtGuard)
@Controller('foods')
export class FoodController {

    constructor(private foodService: FoodService) { }

    // Retrieve all foods.
    @Get()
    async getAllFoods(@Res() res: Response) {
        try {
            const foods = await this.foodService.getAllFoods();
            // Respond with retrieved foods and a success message.
            return res.status(HttpStatus.OK).json({ message: 'Successfully retrieved foods', foods });
        } catch (error) {
            // If an error occurs, respond with a generic error message.
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    // Retrieve foods associated with a specific user.
    @Get('user')
    async getFoodsByUserId(@GetUser('id') userId: number, @Res() res: Response) {
        try {
            const foods = await this.foodService.getFoodsByUserId(userId);
            // Respond with retrieved foods and a success message.
            return res.status(HttpStatus.OK).json({ message: 'Successfully retrieved user foods', foods });
        } catch (error) {
            // If an error occurs, respond with a generic error message.
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    // Retrieve a specific food item by its ID.
    @Get(':id')
    async getFoodByBookId(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) foodId: number,
        @Res() res: Response
    ) {
        try {
            const food = await this.foodService.getFoodByBookId(userId, foodId);
            // Respond with retrieved food and a success message.
            return res.status(HttpStatus.OK).json({ message: 'Successfully retrieved food', food });
        } catch (error) {
            // If an error occurs, respond with a generic error message.
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    // Create a new food item associated with a user.
    @Post()
    async createFood(
        @GetUser('id') userId: number,
        @Body() dto: CreateFoodDto,
        @Res() res: Response
    ) {
        try {
            const food = await this.foodService.createFood(userId, dto);
            // Respond with created food and a success message.
            return res.status(HttpStatus.CREATED).json({ message: 'Food created successfully', food });
        } catch (error) {
            // If an error occurs, respond with a generic error message.
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    // Edit a specific food item's details.
    @Patch(':id')
    async editFoodById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) foodId: number,
        @Body() dto: EditFoodDto,
        @Res() res: Response
    ) {
        try {
            // Respond with edited food and a success message.
            const editedFood = await this.foodService.editFoodById(userId, foodId, dto);
            return res.status(HttpStatus.OK).json({ message: 'Food edited successfully', food: editedFood });
        } catch (error) {
            // If an error occurs, respond with a generic error message.
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    // Delete a specific food item.
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteFoodById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) foodId: number,
        @Res() res: Response
    ) {
        try {
            await this.foodService.deleteFoodById(userId, foodId);
            // Respond with a success message.
            return res.status(HttpStatus.NO_CONTENT).json({ message: 'Food deleted successfully' });
        } catch (error) {
            // If an error occurs, respond with a generic error message.
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }
}
