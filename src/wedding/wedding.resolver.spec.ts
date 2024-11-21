import { Test, TestingModule } from '@nestjs/testing';
import { WeddingResolver } from './wedding.resolver';
import { WeddingService } from './wedding.service';

describe('WeddingResolver', () => {
  let resolver: WeddingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeddingResolver, WeddingService],
    }).compile();

    resolver = module.get<WeddingResolver>(WeddingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
