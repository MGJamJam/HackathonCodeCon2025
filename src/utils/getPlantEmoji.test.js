import { describe, it, expect } from 'vitest'
import getRandomPlantEmoji from './getPlantEmoji'

describe('getPlantEmoji', () => {
  const possibleEmojis = [
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
  ]

  it('deve retornar um emoji da lista de plantas', () => {
    const emoji = getRandomPlantEmoji()
    expect(possibleEmojis).toContain(emoji)
  })

  it('deve retornar valores diferentes em execuções múltiplas (alta probabilidade)', () => {
    const emojis = new Set()
    for (let i = 0; i < 20; i++) {
      emojis.add(getRandomPlantEmoji())
    }
    expect(emojis.size).toBeGreaterThan(1)
  })
})
