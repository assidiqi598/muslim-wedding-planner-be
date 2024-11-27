import { Test, TestingModule } from '@nestjs/testing';
import { Schema as MongooseSchema } from 'mongoose';
import { WeddingService } from './wedding.service';
import { UserModule } from 'src/user/user.module';
import {
  closeMongodConnection,
  mongooseTestModule,
} from 'src/common/helpers/mongoose.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Wedding, WeddingSchema } from './entities/wedding.entity';
import { Gender, User, UserSchema } from 'src/user/entities/user.entity';
import { Vendor, VendorSchema } from 'src/vendor/entities/vendor.entity';
import { UserService } from 'src/user/user.service';
import { VendorService } from 'src/vendor/vendor.service';
import { Service, ServiceSchema } from 'src/service/entities/service.entity';
import { ServiceService } from 'src/service/service.service';
import { createVendorInput } from 'src/vendor/vendor.service.spec';
import { UpdateWeddingInput } from './dto/update-wedding.input';
import { UpdateWeddingHantaranInput } from './dto/update-wedding-hantaran.input';
import { UpdateWeddingMemberInput } from './dto/update-wedding-member.input';
import { UpdateWeddingVendorInput } from './dto/update-wedding-vendor.input';
import { createServiceInput } from 'src/service/service.service.spec';
import { createWeddingInput } from './stubs/wedding.stub';
import { createUserInput } from 'src/user/stubs/user.stub';

const now = new Date();

const updateWeddingInput: UpdateWeddingInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  note: 'Pernikahan yang halal dan berkah, aamiiin',
  budget: 50000000,
  startDate: now,
  endDate: new Date(now.setDate(now.getDate() + 180)),
};

const updateWeddingHantaranInput: UpdateWeddingHantaranInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  hantaran: [
    {
      name: 'Sepatu',
      price: 500000,
      isPurchased: true,
    },
    {
      name: 'Tas',
      price: 300000,
      isPurchased: false,
    },
  ],
};

const updateWeddingMemberInput: UpdateWeddingMemberInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  member: [],
};

const updateWeddingVendorInput: UpdateWeddingVendorInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  vendors: [],
};

describe('WeddingService', () => {
  let weddingService: WeddingService, module: TestingModule, vendor: Vendor;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [WeddingService, UserService, VendorService, ServiceService],
      imports: [
        mongooseTestModule(),
        UserModule,
        MongooseModule.forFeature([
          {
            name: Wedding.name,
            schema: WeddingSchema,
          },
          {
            name: User.name,
            schema: UserSchema,
          },
          {
            name: Vendor.name,
            schema: VendorSchema,
          },
          {
            name: Service.name,
            schema: ServiceSchema,
          },
        ]),
      ],
    }).compile();

    weddingService = module.get<WeddingService>(WeddingService);
    const userService = module.get<UserService>(UserService);
    const vendorService = module.get<VendorService>(VendorService);
    const serviceService = module.get<ServiceService>(ServiceService);

    const groom = await userService.create(createUserInput);
    const bride = await userService.create({
      ...createUserInput,
      name: 'Shion',
      gender: Gender.WOMAN,
      email: 'shion@mail.com',
    });
    const father = await userService.create({
      ...createUserInput,
      name: "Shion's father",
      email: 'shion_father@mail.com',
    });

    createWeddingInput.groom = groom._id;
    createWeddingInput.bride = bride._id;
    updateWeddingMemberInput.member.push(father._id);

    const hantaranService = await serviceService.create(createServiceInput);

    createVendorInput.services.push({
      service: hantaranService._id,
      priceRange: '35k - 55k per box',
      description: 'Jasa rias hantaran',
    });

    vendor = await vendorService.create(createVendorInput);

    updateWeddingVendorInput.vendors.push({
      vendor: vendor._id,
      service: hantaranService._id,
      cost: 750000,
      note: 'Diambil H-3',
    });
  }, 30000);

  it('should create a wedding', async () => {
    const wedding = await weddingService.create(createWeddingInput);
    expect(wedding._id).toBeDefined();
    expect(wedding.groom).toStrictEqual(createWeddingInput.groom);
    expect(wedding.bride).toStrictEqual(createWeddingInput.bride);

    updateWeddingInput._id = wedding._id;
    updateWeddingHantaranInput._id = wedding._id;
    updateWeddingMemberInput._id = wedding._id;
    updateWeddingVendorInput._id = wedding._id;
  });

  it('should remove a wedding by id', async () => {
    const res = await weddingService.removeById(updateWeddingInput._id);
    expect(res.deletedCount).toBe(1);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeMongodConnection();
    }
  });
});
