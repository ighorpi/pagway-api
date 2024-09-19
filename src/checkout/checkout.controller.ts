import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  create(@Body() createCheckoutDto: CreateCheckoutDto) {
    const data = {
      ...createCheckoutDto,
      expirationDate: new Date(createCheckoutDto.expirationDate),
    };
    return this.checkoutService.create(data);
  }

  @Get()
  async findAll() {
    const result = await this.checkoutService.findAll();
    result.map((item) => {
      item.cardNumber = this.maskCard(item.cardNumber);
    });
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.checkoutService.findOne(+id);
    return {
      ...result,
      cardNumber: this.maskCard(result.cardNumber),
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckoutDto: UpdateCheckoutDto,
  ) {
    const data = {
      ...updateCheckoutDto,
      expirationDate: new Date(updateCheckoutDto.expirationDate),
    };
    return this.checkoutService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutService.remove(+id);
  }

  maskCard(texto) {
    return texto.replace(/(?<=\d{4})\d(?=\d{4})/g, '*');
  }
}
