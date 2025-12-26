import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { HealthReportService } from './health-report.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('health-report')
@UseGuards(FirebaseAuthGuard)
export class HealthReportController {
  constructor(
    private readonly healthReportService: HealthReportService,
    private readonly usersService: UsersService,
  ) {}

  @Get('symptom-frequency')
  async getSymptomFrequency(@Req() req: any, @Query('days') days?: number) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.healthReportService.getSymptomFrequency(user._id.toString());
  }

  @Get('cycle-summary')
  async getCycleSummary(@Req() req: any) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.healthReportService.getCycleSummary(user._id.toString());
  }

  @Get('cycle-records')
  async getCycleRecords(@Req() req: any, @Query('limit') limit?: number) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.healthReportService.getCycleRecords(user._id.toString(), limit);
  }

  @Get('symptom-logs')
  async getSymptomLogs(
    @Req() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.healthReportService.getSymptomLogs(
      user._id.toString(),
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
