import { db, client } from "../index.js";
import { aiModels, features, quotaRules, systemSettings } from "../schema/index.js";

async function main() {
  console.log("🌱 Memulai seeding basis data ricat...");

  // 1. Seed AI Models
  console.log("➡️ Seeding model AI...");
  await db
    .insert(aiModels)
    .values([
      {
        id: "gemini-flash",
        provider: "google",
        modelId: "gemini-2.5-flash",
        displayName: "Gemini 2.5 Flash",
        tier: "default",
        guestAllowed: true,
        enabled: true,
        priceInPerMtok: "0.075",
        priceOutPerMtok: "0.300",
        maxOutputTokens: 8192,
      },
      {
        id: "claude-sonnet",
        provider: "anthropic",
        modelId: "claude-3-5-sonnet-20241022",
        displayName: "Claude 3.5 Sonnet",
        tier: "high-reasoning",
        guestAllowed: false,
        enabled: true,
        priceInPerMtok: "3.000",
        priceOutPerMtok: "15.000",
        maxOutputTokens: 8192,
      },
      {
        id: "gpt-4o-mini",
        provider: "openai",
        modelId: "gpt-4o-mini",
        displayName: "GPT-4o-mini",
        tier: "default",
        guestAllowed: true,
        enabled: true,
        priceInPerMtok: "0.150",
        priceOutPerMtok: "0.600",
        maxOutputTokens: 8192,
      },
      {
        id: "deepseek-local",
        provider: "local",
        modelId: "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
        displayName: "DeepSeek-R1 Local Cluster",
        tier: "offline-local",
        guestAllowed: false,
        enabled: true,
        priceInPerMtok: "0.000",
        priceOutPerMtok: "0.000",
        maxOutputTokens: 8192,
      },
    ])
    .onConflictDoNothing();

  // 2. Seed Default Features
  console.log("➡️ Seeding fitur sistem...");
  await db
    .insert(features)
    .values([
      { key: "chat", name: "AI Chat Assistant", enabled: true, guestAllowed: true, requiresPaidAi: false },
      { key: "konverter", name: "Konverter & Kompresi Berkas", enabled: true, guestAllowed: true, requiresPaidAi: false },
      { key: "sumber", name: "Tanya Modul RAG PDF", enabled: true, guestAllowed: false, requiresPaidAi: true },
      { key: "stt", name: "Speech-to-Text Whisper Kuliah", enabled: true, guestAllowed: false, requiresPaidAi: true },
      { key: "jurnal", name: "Ringkasan Jurnal 4-Pilar", enabled: true, guestAllowed: false, requiresPaidAi: true },
      { key: "belajar", name: "Kuis & Flashcards", enabled: true, guestAllowed: true, requiresPaidAi: false },
    ])
    .onConflictDoNothing();

  // 3. Seed Default System Settings
  console.log("➡️ Seeding setelan sistem...");
  await db
    .insert(systemSettings)
    .values([
      {
        key: "emergency_kill_switch",
        value: { active: false, reason: null, triggeredAt: null },
      },
      {
        key: "guest_daily_limit",
        value: { max_messages: 5, max_file_size_mb: 5 },
      },
      {
        key: "monthly_budget_cap_usd",
        value: { limit: 150.0, current: 48.25, alert_threshold_pct: 80 },
      },
    ])
    .onConflictDoNothing();

  console.log("✅ Seeding selesai dengan sukses!");
  await client.end();
}

main().catch((err) => {
  console.error("❌ Galat saat seeding:", err);
  process.exit(1);
});

