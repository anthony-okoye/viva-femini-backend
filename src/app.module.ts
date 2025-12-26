import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ContentModule } from './modules/content/content.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { HealthReportModule } from './modules/health-report/health-report.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UsersModule,
    AuthModule,
    FirebaseModule,
    ContentModule,
    TrackingModule,
    HealthReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
