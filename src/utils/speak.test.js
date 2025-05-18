import { describe, it, expect, vi, beforeEach } from 'vitest'
import speak from './speak'

describe('speak', () => {
  const mockSpeak = vi.fn()
  const mockUtteranceInstance = { lang: '', voice: null }
  const mockUtterance = vi.fn(() => mockUtteranceInstance)
  const mockVoice = { name: 'Voice 1', lang: 'pt-BR' }

  beforeEach(() => {
    vi.clearAllMocks()

    global.speechSynthesis = {
      getVoices: vi.fn(() => [mockVoice]),
      speak: mockSpeak,
    }

    global.SpeechSynthesisUtterance = mockUtterance
  })

  it('deve criar uma utterance com voz aleatória e chamar speechSynthesis.speak', () => {
    speak('Olá planta!')

    expect(global.speechSynthesis.getVoices).toHaveBeenCalled()
    expect(global.SpeechSynthesisUtterance).toHaveBeenCalledWith('Olá planta!')
    expect(mockUtteranceInstance.voice).toEqual(mockVoice)
    expect(mockUtteranceInstance.lang).toBe('pt-BR')
    expect(global.speechSynthesis.speak).toHaveBeenCalledWith(mockUtteranceInstance)
  })
})
