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
import { UpdateWeddingInput } from './dto/update-wedding.input';
import { UpdateWeddingHantaranInput } from './dto/update-wedding-hantaran.input';
import { UpdateWeddingMemberInput } from './dto/update-wedding-member.input';
import { UpdateWeddingVendorInput } from './dto/update-wedding-vendor.input';
import { createWeddingInput } from './stubs/wedding.stub';
import { createUserInput } from 'src/user/stubs/user.stub';
import { createServiceInput } from 'src/service/stubs/service.stub';
import { createVendorInput } from 'src/vendor/stubs/vendor.stub';

const updateWeddingInput: UpdateWeddingInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  note: 'Pernikahan yang halal dan berkah, aamiiin',
  budget: 70000000,
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 180)),
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
  let weddingService: WeddingService,
    userService: UserService,
    module: TestingModule,
    vendor: Vendor;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [WeddingService, UserService, VendorService, ServiceService],
      imports: [
        mongooseTestModule(),
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
    userService = module.get<UserService>(UserService);
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
    updateWeddingInput.groom = groom._id;
    updateWeddingInput.bride = bride._id;
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

    createWeddingInput.bride = null;
    createWeddingInput.groom = null;
  });

  it('should create more weddings and find all weddings with limit and skip', async () => {
    const groom1 = await userService.create({
      ...createUserInput,
      email: 'groom1@mail.com',
      name: 'groom user 1',
    });
    const groom2 = await userService.create({
      ...createUserInput,
      email: 'groom2@mail.com',
      name: 'groom user 2',
    });
    const groom3 = await userService.create({
      ...createUserInput,
      email: 'groom3@mail.com',
      name: 'groom user 3',
    });

    const wedding1 = await weddingService.create({
      ...createWeddingInput,
      groom: groom1._id,
    });
    const wedding2 = await weddingService.create({
      ...createWeddingInput,
      groom: groom2._id,
    });
    const wedding3 = await weddingService.create({
      ...createWeddingInput,
      groom: groom3._id,
    });

    const weddings = await weddingService.findAll(1, 3);

    expect(weddings[0]._id).toStrictEqual(wedding1._id);
    expect(weddings[1]._id).toStrictEqual(wedding2._id);
    expect(weddings[2]._id).toStrictEqual(wedding3._id);
  });

  it('should update general info of a wedding', async () => {
    const updatedWedding = await weddingService.updateGeneralInfo(
      updateWeddingInput._id,
      updateWeddingInput,
    );

    expect(updatedWedding.budget).toBe(updateWeddingInput.budget);
    expect(updatedWedding.note).toBe(updateWeddingInput.note);
    expect(updatedWedding.startDate).toStrictEqual(
      updateWeddingInput.startDate,
    );
    expect(updatedWedding.endDate).toStrictEqual(updateWeddingInput.endDate);

    expect(updatedWedding.groom).toStrictEqual(updateWeddingInput.groom);
    expect(updatedWedding.bride).toStrictEqual(updateWeddingInput.bride);
  });

  it('should update hantaran of a wedding', async () => {
    const updatedWedding = await weddingService.updateHantaran(
      updateWeddingHantaranInput._id,
      updateWeddingHantaranInput,
    );

    expect(updatedWedding.hantaran).toHaveLength(2);
  });

  it('should update member of a wedding', async () => {
    const updatedWedding = await weddingService.updateMember(
      updateWeddingMemberInput._id,
      updateWeddingMemberInput,
    );

    expect(updatedWedding.member).toHaveLength(1);
    expect(updatedWedding.member[0]).toStrictEqual(
      updateWeddingMemberInput.member[0],
    );
  });

  it('should update vendor of a wedding', async () => {
    const updatedWedding = await weddingService.updateVendor(
      updateWeddingVendorInput._id,
      updateWeddingVendorInput,
    );

    expect(updatedWedding.vendors).toHaveLength(1);
    expect(updatedWedding.vendors[0].vendor).toStrictEqual(
      updateWeddingVendorInput.vendors[0].vendor,
    );
  });

  it('should remove a wedding by id', async () => {
    const res = await weddingService.removeById(updateWeddingInput._id);
    expect(res.deletedCount).toBe(1);
  });

  it('should get error not found for getting the removed wedding', async () => {
    try {
      await weddingService.findById(updateWeddingInput._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response).toBeDefined();
      expect(error.response.statusCode).toBe(404);
    }
  });

  it('should get error when attempting to update the removed user', async () => {
    try {
      await weddingService.updateGeneralInfo(
        updateWeddingInput._id,
        updateWeddingInput,
      );
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response).toBeDefined();
      expect(error.response.statusCode).toBe(404);
    }
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeMongodConnection();
    }
  });
});
