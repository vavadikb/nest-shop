import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { Product } from './entities/product.entity';
import { dataSourseOptions } from './database/data-source-migration';
import { OrderController } from './orders/order.controller';
import { OrderService } from './orders/order.service';
import { CartItemService } from './cart-item/cart-item.service';
import { CartItemController } from './cart-item/cart-item.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourseOptions),
    TypeOrmModule.forFeature([Product, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AppController, ProductsController, AuthController],
  providers: [AppService, ProductsService, AuthService, LocalStrategy],
})
export class AppModule {}
