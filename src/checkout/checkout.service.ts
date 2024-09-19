import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(checkoutDto: CreateCheckoutDto) {
    const result = await this.prisma.checkout.create({
      data: {
        transactionId: checkoutDto.transactionId,
        amount: checkoutDto.amount,
        description: checkoutDto.description,
        cardHolder: checkoutDto.cardHolder,
        cardNumber: checkoutDto.cardNumber,
        cvv: checkoutDto.cvv,
        expirationDate: checkoutDto.expirationDate,
      },
    });
    return result;
  }

  async findAll() {
    return await this.prisma.checkout.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.checkout.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByTransaction(id: string) {
    return await this.prisma.checkout.findUnique({
      where: {
        transactionId: id,
      },
    });
  }

  async update(id: number, checkoutDto: UpdateCheckoutDto) {
    const result = await this.prisma.checkout.update({
      data: {
        transactionId: checkoutDto.transactionId,
        amount: checkoutDto.amount,
        description: checkoutDto.description,
        cardHolder: checkoutDto.cardHolder,
        cardNumber: checkoutDto.cardNumber,
        cvv: checkoutDto.cvv,
        expirationDate: checkoutDto.expirationDate,
      },
      where: {
        id: id,
      },
    });
    return result;
  }

  async updateByTransaction(id: string, checkoutDto: UpdateCheckoutDto) {
    const result = await this.prisma.checkout.create({
      data: {
        transactionId: id,
        amount: checkoutDto.amount,
        description: checkoutDto.description,
        cardHolder: checkoutDto.cardHolder,
        cardNumber: checkoutDto.cardNumber,
        cvv: checkoutDto.cvv,
        expirationDate: checkoutDto.expirationDate,
      },
    });
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }
  async removeByTransaction(id: string) {
    return await this.prisma.checkout.delete({
      where: {
        transactionId: id,
      },
    });
  }
}
