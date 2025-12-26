/**
 * Seed script for MongoDB content collections
 * Run this script to populate initial content data
 * 
 * Usage: Copy and paste these documents into MongoDB Compass or Atlas
 */

export const seedData = {
  // Articles Collection
  articles: [
    {
      title: "5 Ways to Reduce Stress During Your Cycle",
      image: "/img/img-1.jpg",
      excerpt: "Learn effective stress management techniques tailored to your menstrual cycle phases.",
      content: "",
      category: "wellness",
      tags: ["stress", "mental-health", "cycle"],
      isActive: true,
      order: 1
    },
    {
      title: "Best Nutrition Tips for Better Energy",
      image: "/img/img-2.jpg",
      excerpt: "Discover foods that boost energy levels throughout your cycle.",
      content: "",
      category: "nutrition",
      tags: ["nutrition", "energy", "health"],
      isActive: true,
      order: 2
    },
    {
      title: "How Sleep Affects Hormonal Balance",
      image: "/img/img-3.jpg",
      excerpt: "Understanding the connection between quality sleep and hormone regulation.",
      content: "",
      category: "sleep",
      tags: ["sleep", "hormones", "health"],
      isActive: true,
      order: 3
    }
  ],

  // Quick Actions Collection
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

  // Symptom Categories Collection
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

  // Health Tips Collection
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

// MongoDB Insert Commands (for MongoDB Shell or Compass)
console.log('=== SEED DATA FOR MONGODB ===\n');
console.log('// Insert Articles');
console.log('db.articles.insertMany(' + JSON.stringify(seedData.articles, null, 2) + ');\n');
console.log('// Insert Quick Actions');
console.log('db.quick_actions.insertMany(' + JSON.stringify(seedData.quickActions, null, 2) + ');\n');
console.log('// Insert Symptom Categories');
console.log('db.symptom_categories.insertMany(' + JSON.stringify(seedData.symptomCategories, null, 2) + ');\n');
console.log('// Insert Health Tips');
console.log('db.health_tips.insertMany(' + JSON.stringify(seedData.healthTips, null, 2) + ');\n');
