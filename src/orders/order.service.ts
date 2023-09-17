import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private readonly cartItemRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrder(userId: number): Promise<void> {
    const cartItems = await this.cartItemRepository
    .createQueryBuilder('cartItem')
    .leftJoinAndSelect('cartItem.user', 'user')
    .leftJoinAndSelect('cartItem.product', 'product')
    .where('cartItem.user.id = :userId', { userId })
    .getMany();

    const orders = cartItems.map((cartItem) => {
      const order = new Order();
      order.user = cartItem.user;
      order.product = cartItem.product;
      order.status = 'In shipping';
      return order;
    });
    
    await this.orderRepository.save(orders);
    await this.cartItemRepository.remove(cartItems);
  }
  async getUserOrders(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({ where: { user: { id: userId } } });
  }

  async updateOrderStatus(orderId: number, status: string): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.status = status;
    await this.orderRepository.save(order);
  }

  async deleteOrder(orderId: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    await this.orderRepository.remove(order);
  }
}
