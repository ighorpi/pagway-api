import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayableDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  status?: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  paymentDate: Date;
  @ApiProperty()
  checkoutId: number;
}
