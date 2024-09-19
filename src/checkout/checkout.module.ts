import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [CheckoutController],
  imports: [PrismaModule],
  providers: [CheckoutService],
})
export class CheckoutModule {}
