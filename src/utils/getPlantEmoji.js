const plantEmojis = [
  "🌿",
  "🌱",
  "🌵",
  "🌳",
  "🌴",
  "🪴",
  "🍀",
  "🌼",
  "🌻",
  "🍃",
];

export default function getRandomPlantEmoji() {
  const index = Math.floor(Math.random() * plantEmojis.length);
  return plantEmojis[index];
}
