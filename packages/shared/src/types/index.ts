import { USER_ROLES, USER_STATUSES, AI_PRESETS, CITATION_STYLES } from '../constants/index.js';

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type UserStatus = (typeof USER_STATUSES)[keyof typeof USER_STATUSES];
export type AiPreset = (typeof AI_PRESETS)[keyof typeof AI_PRESETS];
export type CitationStyle = (typeof CITATION_STYLES)[keyof typeof CITATION_STYLES];

export interface UserSession {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface QuotaInfo {
  dailyUsed: number;
  dailyLimit: number;
  monthlyCostUsd: number;
  monthlyCapUsd: number;
}

export interface CitationItem {
  id: string;
  sourceId: string;
  claimKey: string;
  title: string;
  authors: string[];
  year: number;
  page?: number;
  status: 'ok' | 'needs_source';
}

