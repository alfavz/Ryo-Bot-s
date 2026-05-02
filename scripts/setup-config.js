const fs = require("fs");
const path = require("path");
const readline = require("readline");

const configPath = path.resolve(__dirname, "..", "config.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question, defaultValue) => {
  const prompt =
    defaultValue === undefined
      ? `${question}: `
      : `${question} (${defaultValue}): `;
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      if (!answer.trim()) {
        return resolve(defaultValue);
      }
      resolve(answer.trim());
    });
  });
};

const parseBool = (value) => {
  if (typeof value === "boolean") return value;
  const normalized = String(value).trim().toLowerCase();
  return (
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "y"
  );
};

const quote = (value) => `"${String(value).replace(/"/g, '\\"')}"`;

const writeConfig = (data) => {
  const file = `global.config = {
  // - PLATFORM SETTING -
  // Atur ke 'true' untuk mengaktifkan, 'false' untuk menonaktifkan
  enableTelegram: ${data.enableTelegram},
  enableDiscord: ${data.enableDiscord},
  enableWhatsApp: ${data.enableWhatsApp},

  // - BOT CONFIG -
  telegramToken: ${quote(data.telegramToken)},
  discordToken: ${quote(data.discordToken)},
  discordClientId: ${quote(data.discordClientId)},
  whatsappNumber: ${quote(data.whatsappNumber)}, // example: 628123456789

  // - OWNER CONFIG -
  ownerTelegram: ${quote(data.ownerTelegram)},
  ownerDiscord: ${quote(data.ownerDiscord)},
  ownerWhatsapp: ${quote(data.ownerWhatsapp)},

  // - BOT SETTING -
  selfMode: ${data.selfMode}, // false = Public, true = Self
  prefix: [${data.prefix.map((item) => quote(item)).join(", ")}],
  ownerName: ${quote(data.ownerName)},
  botName: ${quote(data.botName)},

  // - GEMINI API KEY -
  geminikey: ${quote(data.geminikey)},
  /* ganti dengan API Key Gemini kamu sendiri dari http://aistudio.google.com/
     agar bisa menggunakan fitur AI Dev Assistant (Aidev) */
};

global.api = {
  vera: {
    url: ${quote(data.apiUrl)},
    key: ${quote(data.apiKey)},
  },
  // contoh tambahan API:
  // other: {
  //   url: "https://api.lain.com",
  //   key: "KEY_LAIN",
  // },
};

global.apis = global.api;

global.APIs = Object.fromEntries(
  Object.entries(global.api).map(([name, value]) => [name, value.url]),
);

global.Key = Object.fromEntries(
  Object.entries(global.api).map(([name, value]) => [value.url, value.key]),
);

module.exports = global.config;
`;

  fs.writeFileSync(configPath, file, "utf-8");
};

const main = async () => {
  console.log("=== Setup Config Ryo Bot ===\n");
  const defaults = {
    enableTelegram: true,
    enableDiscord: true,
    enableWhatsApp: true,
    telegramToken: "YOUR_TELEGRAM_TOKEN_HERE",
    discordToken: "YOUR_DISCORD_TOKEN_HERE",
    discordClientId: "-",
    whatsappNumber: "-",
    ownerTelegram: "-",
    ownerDiscord: "-",
    ownerWhatsapp: "-",
    selfMode: true,
    prefix: ["/", "."],
    ownerName: "Fareza",
    botName: "Ryo Yamada • Midnight",
    geminikey: "YOUR_API_KEY",
    apiUrl: "https://api.xelira.web.id",
    apiKey: "QGnhY",
  };

  const config = {};
  config.enableTelegram = parseBool(
    await ask("Enable Telegram (true/false)", defaults.enableTelegram),
  );
  config.enableDiscord = parseBool(
    await ask("Enable Discord (true/false)", defaults.enableDiscord),
  );
  config.enableWhatsApp = parseBool(
    await ask("Enable WhatsApp (true/false)", defaults.enableWhatsApp),
  );
  config.telegramToken = await ask("Telegram token", defaults.telegramToken);
  config.discordToken = await ask("Discord token", defaults.discordToken);
  config.discordClientId = await ask(
    "Discord client ID",
    defaults.discordClientId,
  );
  config.whatsappNumber = await ask(
    "WhatsApp number (628xxx)",
    defaults.whatsappNumber,
  );
  config.ownerTelegram = await ask("Owner Telegram ID", defaults.ownerTelegram);
  config.ownerDiscord = await ask("Owner Discord ID", defaults.ownerDiscord);
  config.ownerWhatsapp = await ask(
    "Owner WhatsApp number",
    defaults.ownerWhatsapp,
  );
  config.selfMode = parseBool(
    await ask("Self mode (true/false)", defaults.selfMode),
  );
  config.prefix = ["/", "."];
  config.ownerName = await ask("Owner name", defaults.ownerName);
  config.botName = await ask("Bot name", defaults.botName);
  config.geminikey = await ask("Gemini API key", defaults.geminikey);
  config.apiUrl = await ask("Vera API URL", defaults.apiUrl);
  config.apiKey = await ask("Vera API key", defaults.apiKey);

  writeConfig(config);
  console.log(`\nConfig berhasil disimpan ke ${configPath}`);
  rl.close();
};

main().catch((err) => {
  console.error(err);
  rl.close();
});
