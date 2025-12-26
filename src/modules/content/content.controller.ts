import { Controller, Get, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('content')
@UseGuards(FirebaseAuthGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getAllContent() {
    return this.contentService.getAllContent();
  }

  @Get('articles')
  async getArticles() {
    return this.contentService.getArticles();
  }

  @Get('quick-actions')
  async getQuickActions() {
    return this.contentService.getQuickActions();
  }

  @Get('symptom-categories')
  async getSymptomCategories() {
    return this.contentService.getSymptomCategories();
  }

  @Get('health-tips')
  async getHealthTips() {
    return this.contentService.getHealthTips();
  }
}
