import { Injectable } from '@nestjs/common';
import { CreatePlayableDto } from './dto/create-playable.dto';
import { UpdatePlayableDto } from './dto/update-playable.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PlayableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlayableDto: CreatePlayableDto) {
    const result = await this.prisma.payable.create({
      data: {
        amount: createPlayableDto.amount,
        cost: createPlayableDto.cost,
        paymentDate: createPlayableDto.paymentDate,
        checkoutId: createPlayableDto.checkoutId,
      },
    });
    return result;
  }

  async findAll() {
    const result = await this.prisma.payable.findMany({});
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.payable.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  }

  update(id: number, updatePlayableDto: UpdatePlayableDto) {
    const result = this.prisma.payable.update({
      data: {
        amount: updatePlayableDto.amount,
        checkoutId: updatePlayableDto.checkoutId,
        cost: updatePlayableDto.cost,
        paymentDate: updatePlayableDto.paymentDate,
        status: updatePlayableDto.status,
      },
      where: {
        id: id,
      },
    });
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} playable`;
  }
}
