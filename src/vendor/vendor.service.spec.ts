import { Test, TestingModule } from '@nestjs/testing';
import { VendorService } from './vendor.service';
import { CreateVendorInput } from './dto/create-vendor.input';

export const createVendorInput: CreateVendorInput = {
  name: 'Humaira',
  description: 'Your trusted partner for decorating your hantaran',
  email: 'humaira.aahv@gmail.com',
  phoneNumber: '',
  address: '',
  postCode: 53133,
  kecamatan: 'Purwokerto Barat',
  kabupaten: 'Banyumas',
  province: 'Jawa Tengah',
  link: 'https://humaira.biz.id',
  services: [],
};

describe('VendorService', () => {
  // let service: VendorService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [VendorService],
  //   }).compile();

  //   service = module.get<VendorService>(VendorService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
