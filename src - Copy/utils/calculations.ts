export function calculateTDEE(
  weight: number,
  height: number,
  age: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'
): number {
  // BMR using Mifflin-St Jeor Equation
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;

  // Activity Multipliers
  const multipliers = {
    sedentary: 1.2,    // Little or no exercise
    light: 1.375,      // Light exercise 1-3 days/week
    moderate: 1.55,    // Moderate exercise 3-5 days/week
    very: 1.725,       // Heavy exercise 6-7 days/week
    extra: 1.9         // Very heavy exercise, physical job
  };

  return Math.round(bmr * multipliers[activityLevel]);
}

export function calculateProteinTarget(
  weight: number,
  goal: 'cutting' | 'maintenance' | 'bulking'
): number {
  const multipliers = {
    cutting: 2.4,      // Higher protein during cut
    maintenance: 2.0,  // Moderate protein
    bulking: 1.8       // Lower protein during bulk
  };

  return Math.round(weight * multipliers[goal]);
}

export function calculateMacroSplit(
  calories: number,
  proteinGrams: number,
  goal: 'muscle_gain' | 'fat_loss' | 'strength' | 'maintenance'
): {
  protein: number;
  carbs: number;
  fats: number;
} {
  const proteinCals = proteinGrams * 4;
  const remainingCals = calories - proteinCals;

  let carbsRatio: number;
  let fatsRatio: number;

  switch (goal) {
    case 'fat_loss':
      carbsRatio = 0.6;
      fatsRatio = 0.4;
      break;
    case 'maintenance':
    case 'strength':
      carbsRatio = 0.65;
      fatsRatio = 0.35;
      break;
    case 'muscle_gain':
      carbsRatio = 0.7;
      fatsRatio = 0.3;
      break;
  }

  const carbsCals = remainingCals * carbsRatio;
  const fatsCals = remainingCals * fatsRatio;

  return {
    protein: proteinGrams,
    carbs: Math.round(carbsCals / 4),
    fats: Math.round(fatsCals / 9)
  };
}

export function calculateComplianceRate(
  achieved: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((achieved / total) * 100);
}

export function calculateHealthRisk(metrics: {
  sleepAvg: number;
  stressAvg: number;
  energyAvg: number;
  moodAvg: number;
  digestiveAvg: number;
}): {
  risk: 'low' | 'moderate' | 'high';
  factors: string[];
} {
  const factors: string[] = [];
  let riskScore = 0;

  // Sleep risk assessment (ideal range: 7-9 hours)
  if (metrics.sleepAvg < 6) {
    factors.push('Insufficient sleep');
    riskScore += 2;
  } else if (metrics.sleepAvg < 7 || metrics.sleepAvg > 9) {
    factors.push('Suboptimal sleep duration');
    riskScore += 1;
  }

  // Stress risk assessment (scale 1-10, lower is better)
  if (metrics.stressAvg > 7) {
    factors.push('High stress levels');
    riskScore += 2;
  } else if (metrics.stressAvg > 5) {
    factors.push('Elevated stress');
    riskScore += 1;
  }

  // Energy level assessment (scale 1-10, higher is better)
  if (metrics.energyAvg < 4) {
    factors.push('Very low energy');
    riskScore += 2;
  } else if (metrics.energyAvg < 6) {
    factors.push('Low energy levels');
    riskScore += 1;
  }

  // Mood assessment (scale 1-10, higher is better)
  if (metrics.moodAvg < 4) {
    factors.push('Poor mood state');
    riskScore += 2;
  } else if (metrics.moodAvg < 6) {
    factors.push('Suboptimal mood');
    riskScore += 1;
  }

  // Digestive health assessment (scale 1-10, higher is better)
  if (metrics.digestiveAvg < 4) {
    factors.push('Poor digestive health');
    riskScore += 2;
  } else if (metrics.digestiveAvg < 6) {
    factors.push('Digestive issues');
    riskScore += 1;
  }

  // Determine overall risk level
  let risk: 'low' | 'moderate' | 'high';
  if (riskScore >= 6) {
    risk = 'high';
  } else if (riskScore >= 3) {
    risk = 'moderate';
  } else {
    risk = 'low';
  }

  return { risk, factors };
}

export function calculateWeeklySummary(dailyLogs: Array<{
  training: { completed: boolean };
  cardio: { duration: number };
  steps: number;
  macros: { compliance: number };
  sleep: { duration: number };
  mood: number;
}>) {
  if (dailyLogs.length === 0) {
    return {
      compliance: 0,
      avgMood: 0,
      avgSleep: 0,
      macroAdherence: 0,
    };
  }

  const totals = dailyLogs.reduce(
    (acc, log) => ({
      trainingCompliance: acc.trainingCompliance + (log.training.completed ? 1 : 0),
      mood: acc.mood + log.mood,
      sleep: acc.sleep + log.sleep.duration,
      macroAdherence: acc.macroAdherence + log.macros.compliance,
    }),
    { trainingCompliance: 0, mood: 0, sleep: 0, macroAdherence: 0 }
  );

  return {
    compliance: (totals.trainingCompliance / dailyLogs.length) * 100,
    avgMood: totals.mood / dailyLogs.length,
    avgSleep: totals.sleep / dailyLogs.length,
    macroAdherence: totals.macroAdherence / dailyLogs.length,
  };
}