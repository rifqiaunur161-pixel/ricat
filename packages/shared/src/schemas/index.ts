import { z } from 'zod';
import { AI_PRESETS } from '../constants/index.js';

export const registerSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(10, 'Kata sandi minimal 10 karakter'),
  captchaToken: z.string().min(1, 'Verifikasi CAPTCHA wajib diselesaikan')
});

export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Kata sandi wajib diisi')
});

export const otpVerifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'Kode OTP harus 6 digit')
});

export const chatRequestSchema = z.object({
  conversationId: z.string().uuid().optional(),
  message: z.string().min(1, 'Pesan tidak boleh kosong'),
  preset: z.nativeEnum(AI_PRESETS).default(AI_PRESETS.SEIMBANG),
  modelId: z.string().optional()
});

