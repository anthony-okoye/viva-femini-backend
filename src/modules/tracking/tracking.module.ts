import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { CycleRecord, CycleRecordSchema } from './schemas/cycle-record.schema';
import { SymptomLog, SymptomLogSchema } from './schemas/symptom-log.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CycleRecord.name, schema: CycleRecordSchema },
      { name: SymptomLog.name, schema: SymptomLogSchema },
    ]),
    UsersModule,
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
