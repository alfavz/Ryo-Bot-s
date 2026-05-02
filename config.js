global.config = {
  // - PLATFORM SETTING -
  // Atur ke 'true' untuk mengaktifkan, 'false' untuk menonaktifkan
  enableTelegram: true,
  enableDiscord: true,
  enableWhatsApp: true,

  // - BOT CONFIG -
  telegramToken: "YOUR_TELEGRAM_TOKEN_HERE",
  discordToken: "YOUR_DISCORD_TOKEN_HERE",
  discordClientId: "-",
  whatsappNumber: "-", // example: 628123456789

  // - OWNER CONFIG -
  ownerTelegram: "-",
  ownerDiscord: "-",
  ownerWhatsapp: "-",

  // - BOT SETTING -
  selfMode: true, // false = Public, true = Self
  prefix: ["/", "."],
  ownerName: "Fareza",
  botName: "Ryo Yamada • Midnight",

  // - GEMINI API KEY -
  geminikey: "YOUR_API_KEY",
  /* ganti dengan API Key Gemini kamu sendiri dari http://aistudio.google.com/
     agar bisa menggunakan fitur AI Dev Assistant (Aidev) */
};

global.api = {
  vera: {
    url: "https://api.xelira.web.id",
    key: "QGnhY",
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
