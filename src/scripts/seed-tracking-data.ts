/**
 * Sample tracking data for seeding
 * This will be imported by the main seed script
 */

export const sampleTrackingData = {
  // Sample cycle records (last 3 months)
  cycleRecords: [
    {
      startDate: new Date('2024-12-01'),
      endDate: new Date('2024-12-05'),
      cycleLength: 28,
      periodLength: 5,
      ovulationDate: new Date('2024-12-15'),
      notes: 'Regular cycle',
    },
    {
      startDate: new Date('2024-11-03'),
      endDate: new Date('2024-11-08'),
      cycleLength: 29,
      periodLength: 5,
      ovulationDate: new Date('2024-11-17'),
      notes: 'Slightly longer cycle',
    },
    {
      startDate: new Date('2024-10-05'),
      endDate: new Date('2024-10-09'),
      cycleLength: 28,
      periodLength: 4,
      ovulationDate: new Date('2024-10-19'),
      notes: 'Normal cycle',
    },
  ],

  // Sample symptom logs (last 8 entries)
  symptomLogs: [
    {
      date: new Date('2024-12-19'),
      symptoms: [
        { category: 'Physical Pain', symptoms: ['cramps', 'headache', 'fatigue', 'breast-tenderness', 'lower-back-pain', 'abdominal-pain'] },
        { category: 'Mood & Mental', symptoms: ['mood-swings', 'irritability'] },
      ],
      flowIntensity: 3,
      notes: 'After lunch...',
    },
    {
      date: new Date('2024-12-18'),
      symptoms: [
        { category: 'Physical Pain', symptoms: ['cramps', 'fatigue', 'headache', 'breast-tenderness', 'water-retention', 'appetite-changes'] },
        { category: 'Mood & Mental', symptoms: ['sad', 'low-motivation'] },
      ],
      flowIntensity: 4,
      notes: 'After lunch',
    },
    {
      date: new Date('2024-12-17'),
      symptoms: [
        { category: 'Physical Pain', symptoms: ['cramps', 'fatigue', 'breast-tenderness', 'abdominal-pain', 'pelvic-pain', 'lower-back-pain'] },
        { category: 'Mood & Mental', symptoms: ['irritability', 'cravings', 'tearfulness'] },
        { category: 'Period Indicators', symptoms: ['spotting'] },
      ],
      flowIntensity: 2,
      notes: 'After lunch',
    },
    {
      date: new Date('2024-12-16'),
      symptoms: [
        { category: 'Physical Pain', symptoms: ['fatigue', 'breast-tenderness', 'water-retention', 'appetite-changes', 'headache', 'cramps'] },
        { category: 'Mood & Mental', symptoms: ['mood-swings', 'cravings'] },
      ],
      flowIntensity: 3,
      notes: 'After lunch',
    },
    {
      date: new Date('2024-12-15'),
      symptoms: [
        { category: 'Physical Pain', symptoms: ['breast-tenderness', 'water-retention', 'fatigue', 'appetite-changes', 'headache', 'cramps'] },
        { category: 'Mood & Mental', symptoms: ['happy', 'cravings'] },
        { category: 'Sexual Health', symptoms: ['increased-sex-drive'] },
      ],
      flowIntensity: 3,
      notes: 'After lunch',
    },
    {
      date: new Date('2024-12-14'),
      symptoms: [
        { category: 'Physical Pain', symptoms: ['breast-tenderness', 'fatigue', 'cramps', 'headache', 'water-retention', 'appetite-changes'] },
        { category: 'Mood & Mental', symptoms: ['neutral', 'cravings'] },
      ],
      flowIntensity: 3,
      notes: 'After lunch',
    },
    {
      date: new Date('2024-12-13'),
      symptoms: [
        { category: 'Physical Pain', symptoms: ['fatigue', 'breast-tenderness', 'appetite-changes', 'cramps', 'headache', 'water-retention'] },
        { category: 'Mood & Mental', symptoms: ['happy', 'cravings'] },
      ],
      flowIntensity: 3,
      notes: 'After lunch',
    },
    {
      date: new Date('2024-12-12'),
      symptoms: [
        { category: 'Physical Pain', symptoms: ['breast-tenderness', 'fatigue', 'appetite-changes', 'cramps', 'headache', 'water-retention'] },
        { category: 'Mood & Mental', symptoms: ['happy'] },
      ],
      flowIntensity: 3,
      notes: 'After lunch',
    },
  ],
};
