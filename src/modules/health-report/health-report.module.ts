import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthReportController } from './health-report.controller';
import { HealthReportService } from './health-report.service';
import { SymptomFrequency, SymptomFrequencySchema } from './schemas/symptom-frequency.schema';
import { CycleRecord, CycleRecordSchema } from '../tracking/schemas/cycle-record.schema';
import { SymptomLog, SymptomLogSchema } from '../tracking/schemas/symptom-log.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SymptomFrequency.name, schema: SymptomFrequencySchema },
      { name: CycleRecord.name, schema: CycleRecordSchema },
      { name: SymptomLog.name, schema: SymptomLogSchema },
    ]),
    UsersModule,
  ],
  controllers: [HealthReportController],
  providers: [HealthReportService],
  exports: [HealthReportService],
})
export class HealthReportModule {}
