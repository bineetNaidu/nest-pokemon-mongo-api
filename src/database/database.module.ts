import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from 'src/shared/constants';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class DatabaseModule {}
