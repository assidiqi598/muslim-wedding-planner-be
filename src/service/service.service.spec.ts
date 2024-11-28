import { Test, TestingModule } from '@nestjs/testing';
import { Schema as MongooseSchema } from 'mongoose';
import { ServiceService } from './service.service';
import {
  closeMongodConnection,
  mongooseTestModule,
} from 'src/common/helpers/mongoose.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './entities/service.entity';
import { createServiceInput } from './stubs/service.stub';
import { UpdateServiceInput } from './dto/update-service.input';

const updateServiceInput: UpdateServiceInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  displayName: 'Rias Hantaran / Seserahan / Wedding Gifts',
};

describe('ServiceService', () => {
  let serviceService: ServiceService, module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ServiceService],
      imports: [
        mongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: Service.name,
            schema: ServiceSchema,
          },
        ]),
      ],
    }).compile();
    serviceService = module.get<ServiceService>(ServiceService);
  });

  it('should create a service', async () => {
    const service = await serviceService.create(createServiceInput);

    expect(service._id).toBeDefined();
    expect(service.name).toBe(createServiceInput.name);
    expect(service.displayName).toBe(createServiceInput.displayName);

    updateServiceInput._id = service._id;
  });

  it('should get all services', async () => {
    const service = await serviceService.findAll();
    expect(service.length).toBe(1);
  });

  it('should get a service based on _id', async () => {
    const service = await serviceService.findById(updateServiceInput._id);
    expect(service.name).toBe(createServiceInput.name);
  });

  it('should get a service based on name', async () => {
    const service = await serviceService.findByName(createServiceInput.name);
    expect(service.name).toBe(createServiceInput.name);
  });

  it('should update a service', async () => {
    const updatedService = await serviceService.update(
      updateServiceInput._id,
      updateServiceInput,
    );

    expect(updatedService.displayName).toBe(updateServiceInput.displayName);

    // prop which was not changed should remain the same
    expect(updatedService.name).toBe(createServiceInput.name);
  });

  it('should remove a service by id', async () => {
    const res = await serviceService.remove(updateServiceInput._id);
    expect(res.deletedCount).toBe(1);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeMongodConnection();
    }
  });
});
