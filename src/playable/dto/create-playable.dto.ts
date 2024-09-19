export class CreatePlayableDto {
  id: number;
  status?: string;
  amount: number;
  cost: number;
  paymentDate: Date;
  checkoutId: number;
}
