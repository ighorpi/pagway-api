import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) {}

  async charge(ckeckoutDto: CreateCheckoutDto) {
    const dMaisTrinta = new Date(new Date().setDate(new Date().getDate() + 30));

    const [checkout, payable] = await this.prisma.$transaction(
      async (prisma) => {
        const checkout = await prisma.checkout.create({
          data: {
            amount: ckeckoutDto.amount,
            cardHolder: ckeckoutDto.cardHolder,
            cardNumber: ckeckoutDto.cardNumber,
            cvv: ckeckoutDto.cvv,
            description: ckeckoutDto.description,
            transactionId: ckeckoutDto.transactionId,
            expirationDate: ckeckoutDto.expirationDate,
          },
        });

        const payable = await prisma.payable.create({
          data: {
            amount: ckeckoutDto.amount,
            paymentDate: dMaisTrinta,
            cost: ckeckoutDto.amount - ckeckoutDto.amount * 0.05, // 5% de taxa
            checkoutId: checkout.id,
          },
        });

        return [checkout, payable];
      },
    );

    return { checkout, payable };
  }

  async balance() {
    const result = await this.prisma.payable.aggregate({
      _sum: {
        cost: true,
      },
      where: {
        paymentDate: {
          lte: new Date(),
        },
      },
    });

    return result;
  }

  async futures() {
    const result = await this.prisma.payable.aggregate({
      _sum: {
        cost: true,
      },
      where: {
        paymentDate: {
          gt: new Date(),
        },
      },
    });

    return result;
  }

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
    return await this.prisma.checkout.findMany({
      include: {
        payables: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.checkout.findUnique({
      where: {
        id: id,
      },
      include: {
        payables: true,
      },
    });
  }

  async findByTransaction(id: string) {
    return await this.prisma.checkout.findUnique({
      where: {
        transactionId: id,
      },
      include: {
        payables: true,
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
