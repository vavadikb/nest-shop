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
import { CartService } from './cart-item/cart.service';
import { CartController } from './cart-item/cart.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/auth.strategy';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourseOptions),
    TypeOrmModule.forFeature([Product, User, Cart, Order]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AppController, ProductsController, AuthController, CartController, OrderController, UserController],
  providers: [AppService, ProductsService, AuthService, LocalStrategy, CartService, OrderService, UserService],
})
export class AppModule {}
