export const APP_NAME = 'ricat';
export const APP_TAGLINE = 'Asisten Kuliah Serba Ada';

export const USER_ROLES = {
  GUEST: 'guest',
  USER: 'user',
  ADMIN: 'admin'
} as const;

export const USER_STATUSES = {
  PENDING_EMAIL: 'pending_email',
  PENDING_APPROVAL: 'pending_approval',
  ACTIVE: 'active',
  REJECTED: 'rejected',
  DISABLED: 'disabled'
} as const;

export const AI_PRESETS = {
  HEMAT: 'hemat',
  SEIMBANG: 'seimbang',
  TERBAIK: 'terbaik'
} as const;

export const CONVERSION_FORMATS = {
  PDF: 'pdf',
  DOCX: 'docx',
  PPTX: 'pptx',
  XLSX: 'xlsx',
  PNG: 'png',
  JPG: 'jpg'
} as const;

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  MONTHLY_CAP_REACHED: 'MONTHLY_CAP_REACHED',
  EMERGENCY_SHUTDOWN: 'EMERGENCY_SHUTDOWN',
  INVALID_INPUT: 'INVALID_INPUT',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
} as const;

