export class CreateCheckoutDto {
  id: number;
  transactionId: string;
  amount: number;
  description: string;
  cardNumber: string;
  cardHolder: string;
  expirationDate: Date;
  cvv: string;
  createdAt: Date;
  payables: any[];
}
