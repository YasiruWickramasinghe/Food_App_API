import {
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodDto, EditFoodDto } from './dto';

@Injectable()
export class FoodService {

    constructor(private prisma: PrismaService) { }

    getAllFoods() {
        return this.prisma.food.findMany({});
    }

    getFoodsByUserId(userId: number) {
        return this.prisma.food.findMany({
            where: {
                userId,
            },
        });
    }

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

    async editFoodById(
        userId: number,
        foodId: number,
        dto: EditFoodDto,
    ) {
        // get the food by id
        const food =
            await this.prisma.food.findUnique({
                where: {
                    id: foodId,
                },
            });

        // check if user owns the food
        if (!food || food.userId !== userId)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        return this.prisma.food.update({
            where: {
                id: foodId,
            },
            data: {
                ...dto,
            },
        });
    }

    async deleteFoodById(
        userId: number,
        foodId: number,
    ) {
        const food =
            await this.prisma.food.findUnique({
                where: {
                    id: foodId,
                },
            });

        // check if user owns the food
        if (!food || food.userId !== userId)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        await this.prisma.food.delete({
            where: {
                id: foodId,
            },
        });
    }
}
