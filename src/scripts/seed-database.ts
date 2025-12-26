import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Article } from '../modules/content/schemas/article.schema';
import { QuickAction } from '../modules/content/schemas/quick-action.schema';
import { SymptomCategory } from '../modules/content/schemas/symptom-category.schema';
import { HealthTip } from '../modules/content/schemas/health-tip.schema';

const seedData = {
  articles: [
    {
      title: "5 Ways to Reduce Stress During Your Cycle",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop",
      excerpt: "Learn effective stress management techniques tailored to your menstrual cycle phases.",
      content: "",
      category: "wellness",
      tags: ["stress", "mental-health", "cycle"],
      isActive: true,
      order: 1
    },
    {
      title: "Best Nutrition Tips for Better Energy",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
      excerpt: "Discover foods that boost energy levels throughout your cycle.",
      content: "",
      category: "nutrition",
      tags: ["nutrition", "energy", "health"],
      isActive: true,
      order: 2
    },
    {
      title: "How Sleep Affects Hormonal Balance",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=500&fit=crop",
      excerpt: "Understanding the connection between quality sleep and hormone regulation.",
      content: "",
      category: "sleep",
      tags: ["sleep", "hormones", "health"],
      isActive: true,
      order: 3
    }
  ],

  quickActions: [
    {
      label: "Log symptoms",
      icon: "pajamas_status-health",
      route: "/tracking",
      color: "primary",
      order: 1,
      isActive: true
    },
    {
      label: "Log period",
      icon: "hugeicons_blood",
      route: "/tracking",
      color: "primary",
      order: 2,
      isActive: true
    },
    {
      label: "Health Report",
      icon: "gravity-ui_stethoscope",
      route: "/health-report",
      color: "primary",
      order: 3,
      isActive: true
    }
  ],

  symptomCategories: [
    {
      category: "Physical Pain",
      symptoms: [
        { id: "cramps", label: "Cramps", emoji: "🩸", color: "pink", description: "" },
        { id: "diarrhea", label: "Diarrhea", emoji: "😖", color: "pink", description: "" },
        { id: "fatigue", label: "Fatigue", emoji: "😴", color: "pink", description: "" },
        { id: "headache", label: "Headache", emoji: "🤦🏽‍♀️", color: "pink", description: "" },
        { id: "neusea", label: "Neusea", emoji: "🤢", color: "pink", description: "" },
        { id: "breast-tenderness", label: "Breast tenderness", emoji: "🫦", color: "pink", description: "" },
        { id: "abdominal-pain", label: "Abdominal pain", emoji: "😖", color: "pink", description: "" },
        { id: "pelvic-pain", label: "Pelvic pain", emoji: "🧎🏽‍♀️", color: "pink", description: "" },
        { id: "water-retention", label: "Water retention", emoji: "💦", color: "pink", description: "" },
        { id: "lower-back-pain", label: "Lower back pain", emoji: "👩🏽‍🦯", color: "pink", description: "" },
        { id: "appetite-changes", label: "Appetite changes", emoji: "🤷🏽‍♀️", color: "pink", description: "" }
      ],
      order: 1,
      isActive: true
    },
    {
      category: "Mood & Mental",
      symptoms: [
        { id: "happy", label: "Happy", emoji: "😊", color: "pink", description: "" },
        { id: "neutral", label: "Neutral", emoji: "😐", color: "pink", description: "" },
        { id: "sad", label: "Sad", emoji: "😔", color: "pink", description: "" },
        { id: "low-motivation", label: "Low Motivation", emoji: "😰", color: "pink", description: "" },
        { id: "mood-swings", label: "Mood swings", emoji: "😤", color: "pink", description: "" },
        { id: "irritability", label: "Irritability", emoji: "😒", color: "pink", description: "" },
        { id: "cravings", label: "Cravings", emoji: "😋", color: "pink", description: "" },
        { id: "tearfulness", label: "Tearfulness", emoji: "🥹", color: "pink", description: "" },
        { id: "difficulty-concentrating", label: "Difficulty Concentrating", emoji: "😑", color: "pink", description: "" }
      ],
      order: 2,
      isActive: true
    },
    {
      category: "Period Indicators",
      symptoms: [
        { id: "spotting", label: "Spotting", emoji: "🩸", color: "pink", description: "" },
        { id: "heavier-flow", label: "heavier flow", emoji: "💦", color: "pink", description: "" },
        { id: "lighter-flow", label: "lighter flow", emoji: "💧", color: "pink", description: "" },
        { id: "virginal-dryness", label: "Virginal Dryness", emoji: "😐", color: "pink", description: "" }
      ],
      order: 3,
      isActive: true
    },
    {
      category: "Sexual Health",
      symptoms: [
        { id: "increased-sex-drive", label: "Increased sex drive", emoji: "😊", color: "pink", description: "" },
        { id: "decreased-sex-drive", label: "Decreased sex drive", emoji: "😐", color: "pink", description: "" },
        { id: "virginal-discharge", label: "Virginal discharge", emoji: "😔", color: "pink", description: "" }
      ],
      order: 4,
      isActive: true
    }
  ],

  healthTips: [
    {
      title: "Sleep & Symptoms",
      content: "Low sleep nights → higher cramp scores",
      category: "sleep",
      conditions: ["cramps", "fatigue"],
      priority: 10,
      isActive: true
    },
    {
      title: "Hydration & Bloating",
      content: "Low hydration → increased bloating",
      category: "hydration",
      conditions: ["bloating", "water-retention"],
      priority: 9,
      isActive: true
    }
  ]
};

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Get models
    const articleModel = app.get<Model<Article>>(getModelToken(Article.name));
    const quickActionModel = app.get<Model<QuickAction>>(getModelToken(QuickAction.name));
    const symptomCategoryModel = app.get<Model<SymptomCategory>>(getModelToken(SymptomCategory.name));
    const healthTipModel = app.get<Model<HealthTip>>(getModelToken(HealthTip.name));

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      articleModel.deleteMany({}),
      quickActionModel.deleteMany({}),
      symptomCategoryModel.deleteMany({}),
      healthTipModel.deleteMany({})
    ]);
    console.log('✅ Existing data cleared\n');

    // Seed Articles
    console.log('📰 Seeding articles...');
    const articles = await articleModel.insertMany(seedData.articles);
    console.log(`✅ Inserted ${articles.length} articles\n`);

    // Seed Quick Actions
    console.log('⚡ Seeding quick actions...');
    const quickActions = await quickActionModel.insertMany(seedData.quickActions);
    console.log(`✅ Inserted ${quickActions.length} quick actions\n`);

    // Seed Symptom Categories
    console.log('🏥 Seeding symptom categories...');
    const symptomCategories = await symptomCategoryModel.insertMany(seedData.symptomCategories);
    console.log(`✅ Inserted ${symptomCategories.length} symptom categories\n`);

    // Seed Health Tips
    console.log('💡 Seeding health tips...');
    const healthTips = await healthTipModel.insertMany(seedData.healthTips);
    console.log(`✅ Inserted ${healthTips.length} health tips\n`);

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Database seeding completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Summary:`);
    console.log(`   • Articles: ${articles.length}`);
    console.log(`   • Quick Actions: ${quickActions.length}`);
    console.log(`   • Symptom Categories: ${symptomCategories.length}`);
    console.log(`   • Health Tips: ${healthTips.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

seed();
