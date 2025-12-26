import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SymptomFrequency } from './schemas/symptom-frequency.schema';
import { CycleRecord } from '../tracking/schemas/cycle-record.schema';
import { SymptomLog } from '../tracking/schemas/symptom-log.schema';

@Injectable()
export class HealthReportService {
  constructor(
    @InjectModel(SymptomFrequency.name) private symptomFrequencyModel: Model<SymptomFrequency>,
    @InjectModel(CycleRecord.name) private cycleRecordModel: Model<CycleRecord>,
    @InjectModel(SymptomLog.name) private symptomLogModel: Model<SymptomLog>,
  ) {}

  async getSymptomFrequency(userId: string) {
    const frequencies = await this.symptomFrequencyModel
      .find({ userId: new Types.ObjectId(userId) })
      .lean();

    const result: Record<string, number> = {};
    frequencies.forEach((freq) => {
      result[freq.category] = freq.percentage;
    });

    return result;
  }

  async getCycleSummary(userId: string) {
    const recentCycles = await this.cycleRecordModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ startDate: -1 })
      .limit(3)
      .lean();

    if (recentCycles.length === 0) {
      return {
        avgCycleLength: 28,
        avgPeriodLength: 5,
        lastPeriodStart: null,
        nextPeriodEstimate: null,
        ovulationWindow: null,
      };
    }

    const avgCycleLength = Math.round(
      recentCycles.reduce((sum, c) => sum + c.cycleLength, 0) / recentCycles.length
    );

    const avgPeriodLength = Math.round(
      recentCycles.reduce((sum, c) => sum + c.periodLength, 0) / recentCycles.length
    );

    const lastCycle = recentCycles[0];
    const lastPeriodStart = lastCycle.startDate;
    
    const nextPeriodEstimate = new Date(lastPeriodStart);
    nextPeriodEstimate.setDate(nextPeriodEstimate.getDate() + avgCycleLength);

    const ovulationStart = new Date(lastPeriodStart);
    ovulationStart.setDate(ovulationStart.getDate() + avgCycleLength - 14 - 2);
    
    const ovulationEnd = new Date(lastPeriodStart);
    ovulationEnd.setDate(ovulationEnd.getDate() + avgCycleLength - 14 + 2);

    return {
      avgCycleLength,
      avgPeriodLength,
      lastPeriodStart,
      nextPeriodEstimate,
      ovulationWindow: {
        start: ovulationStart,
        end: ovulationEnd,
      },
    };
  }

  async getCycleRecords(userId: string, limit = 12) {
    return this.cycleRecordModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ startDate: -1 })
      .limit(limit)
      .lean();
  }

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
}
