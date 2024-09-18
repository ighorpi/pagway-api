import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { CheckoutModule } from './checkout/checkout.module';
import { PlayableModule } from './playable/playable.module';

@Module({
  imports: [PrismaModule, CheckoutModule, PlayableModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
