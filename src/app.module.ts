import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    AuthModule,
    FoodModule,
    UserModule,
    PrismaModule],
})
export class AppModule { }
