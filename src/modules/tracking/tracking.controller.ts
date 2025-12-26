import { Controller, Get, Post, Body, UseGuards, Req, Query } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('tracking')
@UseGuards(FirebaseAuthGuard)
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly usersService: UsersService,
  ) {}

  @Get('cycle-records')
  async getCycleRecords(@Req() req: any, @Query('limit') limit?: number) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.trackingService.getCycleRecords(user._id.toString(), limit);
  }

  @Post('cycle-records')
  async createCycleRecord(@Req() req: any, @Body() data: any) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.trackingService.createCycleRecord(user._id.toString(), data);
  }

  @Get('symptom-logs')
  async getSymptomLogs(
    @Req() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.trackingService.getSymptomLogs(
      user._id.toString(),
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Post('symptom-logs')
  async createSymptomLog(@Req() req: any, @Body() data: any) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.trackingService.createSymptomLog(user._id.toString(), data);
  }
}
