export const NODE_ENVIRONMENT = Object.freeze({
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
} as const);

export type NodeEnvironment =
  (typeof NODE_ENVIRONMENT)[keyof typeof NODE_ENVIRONMENT];

export const APP_ENVIRONMENT = Object.freeze({
  PRODUCTION: 'production',
  STAGING: 'staging',
  LOCAL: 'local',
} as const);

export type AppEnvironment =
  (typeof APP_ENVIRONMENT)[keyof typeof APP_ENVIRONMENT];

export const APP_TIMEZONE = Object.freeze({
  ASIA_SINGAPORE: 'Asia/Singapore',
  ASIA_JAKARTA: 'Asia/Jakarta',
} as const);

export type AppTimezone = (typeof APP_TIMEZONE)[keyof typeof APP_TIMEZONE];
