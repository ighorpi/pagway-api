import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  transactionId: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  cardNumber: string;
  @ApiProperty()
  cardHolder: string;
  @ApiProperty()
  expirationDate: Date;
  @ApiProperty()
  cvv: string;
  @ApiProperty()
  createdAt: Date;
  payables: any[];
}
