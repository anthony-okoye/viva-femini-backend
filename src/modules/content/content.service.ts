import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Article } from './schemas/article.schema';
import { QuickAction } from './schemas/quick-action.schema';
import { SymptomCategory } from './schemas/symptom-category.schema';
import { HealthTip } from './schemas/health-tip.schema';
import { CycleHighlight } from './schemas/cycle-highlight.schema';
import { DailyCheckoff } from './schemas/daily-checkoff.schema';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    @InjectModel(QuickAction.name) private quickActionModel: Model<QuickAction>,
    @InjectModel(SymptomCategory.name) private symptomCategoryModel: Model<SymptomCategory>,
    @InjectModel(HealthTip.name) private healthTipModel: Model<HealthTip>,
    @InjectModel(CycleHighlight.name) private cycleHighlightModel: Model<CycleHighlight>,
    @InjectModel(DailyCheckoff.name) private dailyCheckoffModel: Model<DailyCheckoff>,
  ) {}

  async getAllContent() {
    const [articles, quickActions, symptomCategories, healthTips, cycleHighlights] = await Promise.all([
      this.articleModel.find({ isActive: true }).sort({ order: 1 }).lean(),
      this.quickActionModel.find({ isActive: true }).sort({ order: 1 }).lean(),
      this.symptomCategoryModel.find({ isActive: true }).sort({ order: 1 }).lean(),
      this.healthTipModel.find({ isActive: true }).sort({ priority: -1 }).lean(),
      this.cycleHighlightModel.find({ isActive: true }).sort({ order: 1 }).lean(),
    ]);

    return {
      articles,
      quickActions,
      symptomCategories,
      healthTips,
      cycleHighlights,
    };
  }

  async getArticles() {
    return this.articleModel.find({ isActive: true }).sort({ order: 1 }).lean();
  }

  async getQuickActions() {
    return this.quickActionModel.find({ isActive: true }).sort({ order: 1 }).lean();
  }

  async getSymptomCategories() {
    return this.symptomCategoryModel.find({ isActive: true }).sort({ order: 1 }).lean();
  }

  async getHealthTips() {
    return this.healthTipModel.find({ isActive: true }).sort({ priority: -1 }).lean();
  }

  async getCycleHighlights() {
    return this.cycleHighlightModel.find({ isActive: true }).sort({ order: 1 }).lean();
  }

  async getDailyCheckoff(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.dailyCheckoffModel
      .findOne({
        userId: new Types.ObjectId(userId),
        date: { $gte: today },
      })
      .lean();
  }
}
