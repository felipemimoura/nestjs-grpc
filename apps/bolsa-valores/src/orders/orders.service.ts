import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create({ ...createOrderDto, status: 'PENDING' });
  }

  findAll(account_id: string) {
    return this.orderModel.find({ account_id });
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
