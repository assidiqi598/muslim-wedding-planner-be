import { Module } from '@nestjs/common';
import { WeddingService } from './wedding.service';
import { WeddingResolver } from './wedding.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Wedding, WeddingSchema } from './entities/wedding.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wedding.name, schema: WeddingSchema }]),
  ],
  providers: [WeddingResolver, WeddingService],
})
export class WeddingModule {}
