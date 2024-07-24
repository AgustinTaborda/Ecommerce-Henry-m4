import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeormConfig';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
     inject: [ConfigService],
     useFactory: (ConfigService:ConfigService) => ConfigService.get('typeorm')
    }),
    UsersModule, 
    AuthModule, 
    ProductsModule,
    OrdersModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
