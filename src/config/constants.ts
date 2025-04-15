export const APP_CONFIG = {
  APP_NAME: 'CoachTrack Pro',
  VERSION: '1.0.0',
  DEFAULT_PAGINATION_LIMIT: 10,
  DATE_FORMAT: 'yyyy-MM-dd',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'yyyy-MM-dd HH:mm',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  NUTRITION: {
    FOODS: '/nutrition/foods',
    MEALS: '/nutrition/meals',
    TEMPLATES: '/nutrition/templates',
  },
  TRAINING: {
    EXERCISES: '/training/exercises',
    PROGRAMS: '/training/programs',
    TEMPLATES: '/training/templates',
  },
  HEALTH: {
    BIOMARKERS: '/health/biomarkers',
    VITALS: '/health/vitals',
    SYMPTOMS: '/health/symptoms',
  },
  PROTOCOLS: {
    COMPOUNDS: '/protocols/compounds',
    TEMPLATES: '/protocols/templates',
    ANCILLARIES: '/protocols/ancillaries',
  },
  SUPPLEMENTS: {
    PRODUCTS: '/supplements/products',
    STACKS: '/supplements/stacks',
    INTERACTIONS: '/supplements/interactions',
  },
} as const;