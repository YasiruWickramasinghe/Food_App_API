import {
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodDto, EditFoodDto } from './dto';

@Injectable()
export class FoodService {

    constructor(private prisma: PrismaService) { }

    // Retrieve all food items from the database.
    getAllFoods() {
        return this.prisma.food.findMany({});
    }

    // Retrieve food items belonging to a specific user.
    getFoodsByUserId(userId: number) {
        return this.prisma.food.findMany({
            where: {
                userId,
            },
        });
    }

    // Retrieve a specific food item based on user ID and food ID.
    getFoodByBookId(
        userId: number,
        FoodId: number,
    ) {
        return this.prisma.food.findFirst({
            where: {
                id: FoodId,
                userId,
            },
        });
    }

    // Create a new food item associated with a user.
    async createFood(
        userId: number,
        dto: CreateFoodDto,
    ) {
        const food =
            await this.prisma.food.create({
                data: {
                    userId,
                    ...dto,
                },
            });

        return food;
    }

    // Edit a food item's details by user and food ID.
    async editFoodById(
        userId: number,
        foodId: number,
        dto: EditFoodDto,
    ) {
        // Retrieve the existing food item.
        const food =
            await this.prisma.food.findUnique({
                where: {
                    id: foodId,
                },
            });

        // Check if the user owns the food item.
        if (!food || food.userId !== userId)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        // Update the food item's details.
        return this.prisma.food.update({
            where: {
                id: foodId,
            },
            data: {
                ...dto,
            },
        });
    }

    // Delete a food item based on user and food ID.
    async deleteFoodById(
        userId: number,
        foodId: number,
    ) {
        // Retrieve the existing food item.
        const food =
            await this.prisma.food.findUnique({
                where: {
                    id: foodId,
                },
            });

        // Check if the user owns the food item.
        if (!food || food.userId !== userId)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        // Delete the food item from the database.
        await this.prisma.food.delete({
            where: {
                id: foodId,
            },
        });
    }
}
