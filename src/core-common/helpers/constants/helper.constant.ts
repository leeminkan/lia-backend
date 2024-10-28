export const HELPER_DATE_FORMAT = Object.freeze({
  DATE: 'YYYY-MM-DD',
  FRIENDLY_DATE: 'DD MMM YYYY',
  FRIENDLY_DATE_TIME: 'DD MMM YYYY HH:MM:SS',
  FRIENDLY_DATE_WITH_DAY: 'dddd, DD MMM YYYY',
  FRIENDLY_DATE_TIME_WITH_DAY: 'dddd, DD MMM YYYY HH:MM:SS',
  YEAR_MONTH: 'YYYY-MM',
  MONTH_DATE: 'MM-DD',
  ONLY_YEAR: 'YYYY',
  ONLY_MONTH: 'MM',
  ONLY_DATE: 'DD',
  ONLY_TIME: 'HH:mm',
  ISO_DATE: 'YYYY-MM-DDTHH:MM:SSZ',
  DAY_LONG: 'dddd',
  DAY_SHORT: 'ddd',
  HOUR_LONG: 'HH',
  HOUR_SHORT: 'H',
  MINUTE_LONG: 'mm',
  MINUTE_SHORT: 'm',
  SECOND_LONG: 'ss',
  SECOND_SHORT: 's',
  TIMEZONE: 'Z',
} as const);

export type HelperDateFormat =
  (typeof HELPER_DATE_FORMAT)[keyof typeof HELPER_DATE_FORMAT];

export const HELPER_FILE_EXCEL_TYPE = Object.freeze({
  XLSX: 'xlsx',
  CSV: 'csv',
} as const);

export type HelperFileExcelType =
  (typeof HELPER_FILE_EXCEL_TYPE)[keyof typeof HELPER_FILE_EXCEL_TYPE];

export const HELPER_DATE_DIFF = Object.freeze({
  MILIS: 'milis',
  SECONDS: 'seconds',
  MINUTES: 'minutes',
  HOURS: 'hours',
  DAYS: 'days',
} as const);

export type HelperDateDiff =
  (typeof HELPER_DATE_DIFF)[keyof typeof HELPER_DATE_DIFF];
