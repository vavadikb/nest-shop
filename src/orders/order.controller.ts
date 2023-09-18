import { Controller, Post, Get, Param, Body, Put, Delete, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/entities/order.entity';
import { AuthGuard } from 'src/auth/local-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly jwtService: JwtService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED) // Устанавливаем статус код 201 Created
  async createOrder(@Req() req): Promise<void> {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        await this.orderService.createOrder(userId);
      } catch (error) {
        throw new Error('Bad token');
      }
    } else {
      throw new Error('Error type authorization');
    }
  }
  

  @Get('')
  @HttpCode(HttpStatus.OK) // Устанавливаем статус код 200 OK
  async getUserOrders(@Req() req): Promise<Order[]> {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        return await this.orderService.getUserOrders(userId);
      } catch (error) {
        throw new Error('Bad token');
      }
    } else {
      throw new Error('Error type authorization');
    }
  }

  @Put('/update-order/:orderId/:status')
  @HttpCode(HttpStatus.OK) // Устанавливаем статус код 200 OK
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Param('status') status: string,
  ): Promise<void> {
    await this.orderService.updateOrderStatus(parseInt(orderId, 10), status);
  }
  
  @Delete(':orderId')
  @HttpCode(HttpStatus.NO_CONTENT) // Устанавливаем статус код 204 No Content
  async deleteOrder(@Param('orderId') orderId: string): Promise<void> {
    await this.orderService.deleteOrder(parseInt(orderId, 10));
  }
}
