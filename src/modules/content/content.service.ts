import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { QuickAction } from './schemas/quick-action.schema';
import { SymptomCategory } from './schemas/symptom-category.schema';
import { HealthTip } from './schemas/health-tip.schema';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    @InjectModel(QuickAction.name) private quickActionModel: Model<QuickAction>,
    @InjectModel(SymptomCategory.name) private symptomCategoryModel: Model<SymptomCategory>,
    @InjectModel(HealthTip.name) private healthTipModel: Model<HealthTip>,
  ) {}

  async getAllContent() {
    const [articles, quickActions, symptomCategories, healthTips] = await Promise.all([
      this.articleModel.find({ isActive: true }).sort({ order: 1 }).lean(),
      this.quickActionModel.find({ isActive: true }).sort({ order: 1 }).lean(),
      this.symptomCategoryModel.find({ isActive: true }).sort({ order: 1 }).lean(),
      this.healthTipModel.find({ isActive: true }).sort({ priority: -1 }).lean(),
    ]);

    return {
      articles,
      quickActions,
      symptomCategories,
      healthTips,
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
}
