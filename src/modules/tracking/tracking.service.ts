import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CycleRecord } from './schemas/cycle-record.schema';
import { SymptomLog } from './schemas/symptom-log.schema';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(CycleRecord.name) private cycleRecordModel: Model<CycleRecord>,
    @InjectModel(SymptomLog.name) private symptomLogModel: Model<SymptomLog>,
  ) {}

  // Cycle Records
  async getCycleRecords(userId: string, limit = 12) {
    return this.cycleRecordModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ startDate: -1 })
      .limit(limit)
      .lean();
  }

  async createCycleRecord(userId: string, data: Partial<CycleRecord>) {
    return this.cycleRecordModel.create({
      ...data,
      userId: new Types.ObjectId(userId),
    });
  }

  // Symptom Logs
  async getSymptomLogs(userId: string, startDate?: Date, endDate?: Date) {
    const query: any = { userId: new Types.ObjectId(userId) };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }

    return this.symptomLogModel
      .find(query)
      .sort({ date: -1 })
      .lean();
  }

  async createSymptomLog(userId: string, data: Partial<SymptomLog>) {
    return this.symptomLogModel.create({
      ...data,
      userId: new Types.ObjectId(userId),
    });
  }
}
