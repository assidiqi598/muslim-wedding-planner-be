import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { CreateServiceInput } from './dto/create-service.input';

export const createServiceInput: CreateServiceInput = {
  name: 'RIAS_HANTARAN',
  displayName: 'Rias Hantaran, Rias Seserahan',
};

describe('ServiceService', () => {
  // let service: ServiceService;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ServiceService],
  //   }).compile();
  //   service = module.get<ServiceService>(ServiceService);
  // });
  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
