import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('content')
@UseGuards(FirebaseAuthGuard)
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly usersService: UsersService,
  ) {}

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

  @Get('cycle-highlights')
  async getCycleHighlights() {
    return this.contentService.getCycleHighlights();
  }

  @Get('daily-checkoff')
  async getDailyCheckoff(@Req() req: any) {
    const user = await this.usersService.findByFirebaseUid(req.user.uid);
    return this.contentService.getDailyCheckoff(user._id.toString());
  }
}
