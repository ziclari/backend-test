import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model, Types } from 'mongoose';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderModel.create(createOrderDto);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$user' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
            { $project: { _id: 1, email: 1 } },
          ],
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'trucks',
          let: { truckId: '$truck' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$truckId'] } } },
            { $project: { _id: 1, year: 1, color: 1, plates: 1 } },
          ],
          as: 'truck',
        },
      },
      { $unwind: '$truck' },
      {
        $lookup: {
          from: 'locations',
          let: { pickupId: '$pickup' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$pickupId'] } } },
            { $project: { _id: 1, address: 1 } },
          ],
          as: 'pickup',
        },
      },
      { $unwind: { path: '$dropoff', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'locations',
          let: { dropoffId: '$dropoff' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$dropoffId'] } } },
            { $project: { _id: 1, address: 1 } },
          ],
          as: 'dropoff',
        },
      },
      { $unwind: { path: '$dropoff', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          status: 1,
          user: 1,
          truck: 1,
          pickup: 1,
          dropoff: 1,
        },
      },
    ]);
    if (!order || order.length === 0) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }
    return order[0];
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    // Validar que el status sea uno de los permitidos
    if (!Object.values(OrderStatus).includes(status)) {
      throw new BadRequestException(`Estatus inválido: ${status}`);
    }
    const order = await this.orderModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
      new: true,
    });
    if (!order) throw new NotFoundException(`Orden con id ${id} no encontrada`);
    return order;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id);
    if (!result)
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
  }
}
