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

@UseGuards(JwtGuard)
@Controller('foods')
export class FoodController {

    constructor(
        private foodService: FoodService,
    ) { }

    @Get()
    getAllFoods() {
        return this.foodService.getAllFoods();
    }

    @Get('user')
    getFoodsByUserId(@GetUser('id') userId: number) {
        return this.foodService.getFoodsByUserId(
            userId,
        );
    }

    @Get(':id')
    getFoodByBookId(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) foodId: number,
    ) {
        return this.foodService.getFoodByBookId(
            userId,
            foodId,
        );
    }

    @Post()
    createFood(
        @GetUser('id') userId: number,
        @Body() dto: CreateFoodDto,
    ) {
        return this.foodService.createFood(
            userId,
            dto,
        );
    }

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
        );
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteFoodById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) foodId: number,
    ) {
        return this.foodService.deleteFoodById(
            userId,
            foodId,
        );
    }
}
