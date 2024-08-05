import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeormConfig';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';

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
    CategoriesModule,
    CloudinaryModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h'},
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
