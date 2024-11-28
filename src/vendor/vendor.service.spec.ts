import { Test, TestingModule } from '@nestjs/testing';
import { VendorService } from './vendor.service';
import {
  closeMongodConnection,
  mongooseTestModule,
} from 'src/common/helpers/mongoose.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Vendor, VendorSchema } from './entities/vendor.entity';
import { WeddingService } from 'src/wedding/wedding.service';
import { ServiceService } from 'src/service/service.service';
import { Wedding, WeddingSchema } from 'src/wedding/entities/wedding.entity';
import { Service, ServiceSchema } from 'src/service/entities/service.entity';
import { createVendorInput } from './stubs/vendor.stub';
import { createServiceInput } from 'src/service/stubs/service.stub';
import { UpdateVendorInput } from './dto/update-vendor.input';
import { createWeddingInput } from 'src/wedding/stubs/wedding.stub';

const updateVendorInput: UpdateVendorInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  name: 'Hantarannya Humaira',
  weddings: [],
};

describe('VendorService', () => {
  let vendorService: VendorService, module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [VendorService, WeddingService, ServiceService],
      imports: [
        mongooseTestModule(),
        MongooseModule.forFeature([
          { name: Vendor.name, schema: VendorSchema },
          { name: Wedding.name, schema: WeddingSchema },
          { name: Service.name, schema: ServiceSchema },
        ]),
      ],
    }).compile();

    vendorService = module.get<VendorService>(VendorService);
    const serviceService = module.get<ServiceService>(ServiceService);
    const weddingService = module.get<WeddingService>(WeddingService);

    const hantaranService = await serviceService.create(createServiceInput);

    createVendorInput.services.push({
      service: hantaranService._id,
      priceRange: '35k - 55k per box',
      description: 'Jasa rias hantaran / seserahan',
    });

    const wedding = await weddingService.create(createWeddingInput);

    updateVendorInput.weddings.push(wedding._id);
  });

  it('should create a vendor', async () => {
    const vendor = await vendorService.create(createVendorInput);

    expect(vendor._id).toBeDefined();
    expect(vendor.address).toBe(createVendorInput.address);
    expect(vendor.description).toBe(createVendorInput.description);
    expect(vendor.email).toBe(createVendorInput.email);
    expect(vendor.kabupaten).toBe(createVendorInput.kabupaten);
    expect(vendor.kecamatan).toBe(createVendorInput.kecamatan);
    expect(vendor.link).toBe(createVendorInput.link);
    expect(vendor.name).toBe(createVendorInput.name);
    expect(vendor.phoneNumber).toBe(createVendorInput.phoneNumber);
    expect(vendor.postCode).toBe(createVendorInput.postCode);
    expect(vendor.province).toBe(createVendorInput.province);
    expect(vendor.services[0].service).toStrictEqual(
      createVendorInput.services[0].service,
    );
    expect(vendor.services[0].priceRange).toBe(
      createVendorInput.services[0].priceRange,
    );
    expect(vendor.services[0].description).toBe(
      createVendorInput.services[0].description,
    );

    updateVendorInput._id = vendor._id;
  });

  it('should find vendors with limit and skip', async () => {
    const vendorInput = {
      ...createVendorInput,
      email: null,
      phoneNumber: null,
    };

    const vendor1 = await vendorService.create(vendorInput);
    const vendor2 = await vendorService.create(vendorInput);
    const vendor3 = await vendorService.create(vendorInput);

    const vendors = await vendorService.findAll(1, 3);
    expect(vendors.length).toBe(3);
    expect(vendors[0]._id).toStrictEqual(vendor1._id);
    expect(vendors[1]._id).toStrictEqual(vendor2._id);
    expect(vendors[2]._id).toStrictEqual(vendor3._id);
  });

  it('should find a vendor based on _id', async () => {
    const vendor = await vendorService.findById(updateVendorInput._id);

    expect(vendor._id).toStrictEqual(updateVendorInput._id);
    expect(vendor.name).toBe(createVendorInput.name);
  });

  it('should update a vendor', async () => {
    const updatedVendor = await vendorService.update(
      updateVendorInput._id,
      updateVendorInput,
    );

    expect(updatedVendor.name).toBe(updateVendorInput.name);
    expect(updatedVendor.weddings[0]).toStrictEqual(
      updateVendorInput.weddings[0],
    );

    // not changed property should remain the same
    expect(updatedVendor.email).toBe(createVendorInput.email);
  });

  it('should delete a vendor', async () => {
    const res = await vendorService.remove(updateVendorInput._id);
    expect(res.deletedCount).toBe(1);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeMongodConnection();
    }
  });
});
