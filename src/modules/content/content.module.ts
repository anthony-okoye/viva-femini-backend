import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { Article, ArticleSchema } from './schemas/article.schema';
import { QuickAction, QuickActionSchema } from './schemas/quick-action.schema';
import { SymptomCategory, SymptomCategorySchema } from './schemas/symptom-category.schema';
import { HealthTip, HealthTipSchema } from './schemas/health-tip.schema';
import { CycleHighlight, CycleHighlightSchema } from './schemas/cycle-highlight.schema';
import { DailyCheckoff, DailyCheckoffSchema } from './schemas/daily-checkoff.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: QuickAction.name, schema: QuickActionSchema },
      { name: SymptomCategory.name, schema: SymptomCategorySchema },
      { name: HealthTip.name, schema: HealthTipSchema },
      { name: CycleHighlight.name, schema: CycleHighlightSchema },
      { name: DailyCheckoff.name, schema: DailyCheckoffSchema },
    ]),
    UsersModule,
  ],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
