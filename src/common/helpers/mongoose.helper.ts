import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

export const mongooseTestModule = (options: MongooseModuleOptions = {}) => {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      mongo = await MongoMemoryServer.create();
      const mongoUri = mongo.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });
};

export const closeMongodConnection = async () => {
  if (mongo) await mongo.stop();
};
