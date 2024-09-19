import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { PrismaService } from '../prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        {
          provide: PrismaService,
          useValue: {
            checkout: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              findByTransaction: jest.fn(),
              remove: jest.fn(),
              removeByTransaction: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new checkout', async () => {
      const checkoutDto: CreateCheckoutDto & any = {
        transactionId: 'trans123',
        amount: 100,
        description: 'Test transaction',
        cardHolder: 'John Doe',
        cardNumber: '1234567812345678',
        cvv: '123',
        expirationDate: new Date('2024-12-07'),
      };

      const result = await service.create(checkoutDto);
      const value = prismaService.checkout.findUnique({
        where: {
          transactionId: checkoutDto.transactionId,
        },
      });
      expect(result).toEqual(value);
      expect(prismaService.checkout.create).toHaveBeenCalledWith({
        data: checkoutDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all checkouts', async () => {
      const checkouts = [{ transactionId: 'trans123', amount: 100 }];

      prismaService.checkout.findMany({
        select: { transactionId: true, amount: true },
      });

      const result = await service.findAll();
      expect(result).toEqual(checkouts);
      expect(prismaService.checkout.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single checkout by ID', async () => {
      const checkout = { id: 1, transactionId: 'trans123', amount: 100 };

      const value = await prismaService.checkout.findUnique({
        where: {
          transactionId: checkout.transactionId,
        },
      });

      const result = await service.findOne(value.id);
      expect(result).toEqual(value);
      expect(prismaService.checkout.findUnique).toHaveBeenCalledWith({
        where: { id: value.id },
      });
    });
  });

  describe('findByTransaction', () => {
    it('should return a checkout by transaction ID', async () => {
      const checkout = { id: 1, transactionId: 'trans123', amount: 100 };

      const value = await prismaService.checkout.findUnique({
        where: checkout,
      });

      const result = await service.findByTransaction('trans123');
      expect(result).toEqual(value);
      expect(prismaService.checkout.findUnique).toHaveBeenCalledWith({
        where: { transactionId: 'trans123' },
      });
    });
  });

  describe('update', () => {
    it('should update a checkout', async () => {
      const updateDto: UpdateCheckoutDto & any = {
        transactionId: 'trans123',
        amount: 150,
        description: 'Updated transaction',
        cardHolder: 'John Doe',
        cardNumber: '1234567812345678',
        cvv: '123',
        expirationDate: new Date('2024-12-07'),
      };

      prismaService.checkout.update({
        data: updateDto,
        where: {
          transactionId: updateDto.transactionId,
        },
      });

      const value = await prismaService.checkout.findUnique({
        where: updateDto,
      });
      const result = await service.update(value.id, updateDto);

      expect(result).toEqual(value);
      expect(prismaService.checkout.create).toHaveBeenCalledWith({
        data: updateDto,
      });
    });
  });

  describe('remove', () => {
    it('should return a remove confirmation message', async () => {
      const result = await service.remove(1);
      expect(result).toEqual('This action removes a #1 checkout');
    });
  });

  describe('removeByTransaction', () => {
    it('should remove a checkout by transaction ID', async () => {
      const transactionId = 'trans123';

      const deletedCheckout = {
        transactionId: 'trans123',
        amount: 100,
        description: 'Test transaction',
        cardHolder: 'John Doe',
        cardNumber: '1234567812345678',
        cvv: '123',
        expirationDate: new Date('2024-12-07'),
      };

      prismaService.checkout.delete({ where: deletedCheckout });

      const result = await service.removeByTransaction(transactionId);

      expect(result).toEqual(deletedCheckout);
      expect(prismaService.checkout.delete).toHaveBeenCalledWith({
        where: { transactionId },
      });
    });
  });
});
